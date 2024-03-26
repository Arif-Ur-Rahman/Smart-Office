const ResetPassword = require("../models/reset_password.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require('../../config/development.json');
const { transporter, close } = require('../middlewares/email');
const {
  createUser,
  uploadEmployeeImage,
  deleteUser,
  updateUser,
  login,
  logout,
  isLogin,
  accessAdmin,
  forgetPassword,
  resetPassword,
  showUser,
  showActiveUsers,
  changePassword,
} = require("../services/employee.service");

const { baseURL } = require("../helpers/baseURL.helper");

// console.log("Base URL are:", baseURL)

module.exports = {
  createUser: async (req, res, next) => {
    const fieldsData = req.body;
    // console.log("Fields", fieldsData)
    fieldsData.hashedPassword = await bcrypt.hash(fieldsData.password, 10);
    // const filesData = req.file;
    // console.log("Paths are:", filesData)

    await createUser(fieldsData, (error, results, existing) => {
      if (!error) {
        if (!existing) {
          res.status(200).json({
            status: 200,
            success: true,
            message: "Employee added successfully",
            body: results,
          });
        } else {
          res.status(409).json({
            status: 409,
            success: false,
            message: "Email already exist",
            body: null,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },

  uploadEmployeeImage: async (req, res, next) => {
    if(req.error_for_file) {
      res.json({
        status: 404,
        success: false,
        message: "Only jpg, png and jpeg file are allowed !"
      })
    } else {
      const loginId = req.id;
      const filesData = req.file;
    // console.log("Requested Id are:", fieldsData);
    // console.log("Paths are:", filesData);
    await uploadEmployeeImage(loginId, filesData, (error, results) => {
      if (!error) {
          res.status(200).json({
            status: 200,
            success: true,
            message: "Employee Image added successfully",
            body: results,
          });
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
    }
  },

  deleteUser: async (req, res) => {
    const data = req.body;
    await deleteUser(data, (error, results) => {
      if (!error) {
        if (results != null) {
          res.status(200).json({
            status: 200,
            success: true,
            message: "User deleted successfully",
            body: results,
          });
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: "User Not Found",
            body: results,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },

  updateUser: async (req, res, next) => {
    const fieldsData = req.body;
    // const filesData = req.file;

    await updateUser(fieldsData, (error, results) => {
      // console.log("Error are:", error.message)

      if (!error) {
        if (results != null) {
          res.status(200).json({
            status: 200,
            success: true,
            message: "User updated successfully",
            body: results,
          });
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: "User Not Found",
            body: results,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },

  login: async (req, res) => {
    const data = req.body;
    // console.log("Data for Login:", data)
    await login(data, async (error, results) => {
      if (!error) {
        if (results != null) {
          results.imageURL = baseURL + results.imageURL;
          const isValidPassword = await bcrypt.compare(
            data.password,
            results.password
          );
          if (isValidPassword) {
            // generate JWT token
            const token = jwt.sign(
              {
                id: results._id,
                admin: results.is_admin,
                designation: results.designation,
              },
              config.jwt.jwt_secret,
              {
                expiresIn: "9h",
              }
            );
            res.status(200).send({
              status: 200,
              success: true,
              access_token: token,
              message: "Login successfully",
              // body: results,
              id: results._id,
              isAdmin: results.is_admin,
              image: results.imageURL
            });
          }
          else {
            res.status(401).json({
              status: 401,
              success: false,
              message: "Password not valid",
              body: null,
            });
          }
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: "User not found",
            body: null,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },

  logout: async (req, res) => {
    const id = req.id;
    await logout(id, async (error, results) => {
      if (!error) {
        if (results) {
          res.status(200).json({
            status: 200,
            success: true,
            message: 'Sign out success',
            isActive: results.isActive,
          });
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: 'failed to sign out',
            body: null,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },

  isLogin: async (req, res) => {
    const id = req.id;
    await isLogin(id, async (error, results) => {
      if (!error) {
        if (results) {
          res.status(200).json({
            status: 200,
            success: true,
            message: 'User Login',
            isActive: results.isActive,
            isAdmin: results.admin,
          });
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: "User Not Login",
            body: results,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },

  changePassword: async (req, res) => {
    const data = req.body;
    const id = req.id;
    await showUser(id, async (error, results) => {
      // console.log("Results after changeing password:", results)
      if (!error) {
        if (results) {
          const isValidPassword = await bcrypt.compare(
            data.old_password,
            results.password
          );
          if (isValidPassword) {
            data.hashedPassword = await bcrypt.hash(data.new_password, 10);
            await changePassword(data, id, async (error, results) => {
              if (!error) {
                if (results) {
                  res.status(200).json({
                    status: 200,
                    success: true,
                    message: "Password updated successfully",
                    body: null,
                  });
                } else {
                  res.status(422).json({
                    status: 422,
                    success: false,
                    message: "Password update failed",
                    body: null,
                  });
                }
              } else {
                res.status(400).json({
                  status: 400,
                  success: false,
                  message: error.message,
                  body: null,
                });
              }
            });
          } else {
            res.status(401).json({
              status: 401,
              success: false,
              message: "Invalid current password",
              body: null,
            });
          }
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: "User not found",
            body: null,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },

  forgetPassword: async (req, res) => {
    const data = req.body;
    await forgetPassword(data, async (error, id, results) => {
      // console.log("Id for forget password", id)
      // console.log('Results are:', results)
      if (!error) {
        if (results === true) {
          const token = jwt.sign(
            {
              id: id,
              email: req.body.email,
            },
            config.jwt.jwt_secret,
            {
              expiresIn: "4h",
            }
          );
          const reset_password = new ResetPassword({
            id: id,
            email: req.body.email,
            token: token,
            active_status: true,
          });

          await reset_password.save();

          const message = {
            from: "smartoffice@uxd.co.jp",
            to: req.body.email,
            subject: "Reset password",
            text: `Hi,\n\nForgot your password?\n\nWe received a request to reset the password for your account.To reset your password, click on the link below;\n\n http://localhost:4200/reset-password/${token}\n\nThe link will be expired in 4 hours.`
          }

          const mailInfo = transporter.sendMail(message, (err, info) => {
            if (info) {
              close();
              res.status(200).json({
                status: 200,
                success: true,
                message: "Password reset link sent to your email.",
                body: mailInfo,
              })
            }
            else {
              res.status(422).json({
                status: 422,
                success: false,
                message: "Failed to generate link. Try again!",
                body: mailInfo,
              })
            }
          });

        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: "User not found",
            body: null,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },

  resetPassword: async (req, res) => {
    data = req.body;
    let token = data.token;
    data.hashedPassword = await bcrypt.hash(data.password, 10);
    if (token) {
      token = token.split(".")[1].trim();
      const decode = await jwt.verify(
        data.token,
        config.jwt.jwt_secret,
        async (error, info) => {
          if (!error) {
            data.email = info.email;
            const currentTime = Date.now() / 1000;

            if (info.exp > currentTime) {

              let validToken;
              async function checkToken() {
                const validToken = await ResetPassword.findOne({ token: data.token });
                return validToken;
              }
              validToken = await checkToken();

              if (validToken) {
                resetPassword(data, async (error, result) => {
                  if (!error) {
                    if (result) {
                      res.status(200).json({
                        status: 200,
                        success: true,
                        message: "Password updated",
                        body: result,
                      });
                    }
                    else {
                      res.status(404).json({
                        status: 404,
                        success: false,
                        message: "Password update failed",
                        body: null,
                      });
                    }
                  }
                  else {
                    res.status(400).json({
                      status: 400,
                      success: false,
                      message: error.message,
                      body: null,
                    });
                  }
                });
              }
              else {
                res.status(402).json({
                  status: 402,
                  success: false,
                  message: "Token Already used",
                  body: null,
                });
              }
            }
            else {
              res.status(403).json({
                status: 403,
                success: false,
                message: "Token Expired",
                body: null,
              });
            }
          }
          else {
            res.status(405).json({
              status: 405,
              success: false,
              message: "Invalid Token",
              body: null,
            });
          }
        });

    }
    else {
      res.status(401).json({
        status: 401,
        success: false,
        message: "Invalid url",
        body: null,
      });
    }
  },

  showUser: async (req, res) => {
    const id = req.body.id;
    await showUser(id, async (error, results) => {
      // console.log("Results are:", results)
      if (!error) {
        if (results) {
          if(results.imageURL !== undefined) {
            results.imageURL = baseURL + results.imageURL;
          } else{
            results.imageURL = null;
          }
          res.status(200).json({
            status: 200,
            success: true,
            message: "User found",
            body: results,
          });
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: "User not found",
            body: null,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },

  showActiveUsers: async (req, res) => {
    const data = req.body;
    await showActiveUsers(data, async (error, results) => {
      if (!error) {

        if (results) {
          results.map(result => {
            if (result.imageURL !== undefined) {
              result.imageURL = baseURL + result.imageURL;
              // console.log("Result are:", result.imageURL)
            } else {
              result.imageURL = null;
            }
          });
          res.status(200).json({
            status: 200,
            success: true,
            message: "Users List found",
            body: results,
          });
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: "Users List not found",
            body: null,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },

  accessAdmin: async (req, res) => {
    const id = req.body.id;
    const loginId = req.id;
    // console.log("clint ID:", id)
    // console.log("login ID:", loginId)
    await accessAdmin(id, loginId, async (error, results, unchangingResult) => {
      if (!error) {
        if (results) {
          res.status(200).json({
            status: 200,
            success: true,
            message: 'Successfully changed the admin status',
            isAdmin: results.is_admin,
          });

        } else if (unchangingResult) {
          res.status(201).json({
            status: 201,
            success: true,
            message: 'Admin Status unchanged',
            unchangeingIsAdmin: unchangingResult.unchangeingIsAdmin,
          });

        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: "Admin Not Found",
            body: results,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },
  // --- End Here---
};
