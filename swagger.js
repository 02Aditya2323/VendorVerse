const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VendorVerse Job Portal API',
      version: '1.0.0',
      description: 'A comprehensive API for VendorVerse - connecting vendors and sellers for product trading',
      contact: {
        name: 'VendorVerse Team',
        email: 'support@vendorverse.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
          description: 'JWT token stored in cookie'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password', 'role'],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
              example: '507f1f77bcf86cd799439011'
            },
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com'
            },
            password: {
              type: 'string',
              description: 'Hashed password',
              writeOnly: true
            },
            role: {
              type: 'string',
              enum: ['vendor', 'seller'],
              description: 'User role in the system',
              example: 'vendor'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'User last update timestamp'
            }
          }
        },
        Product: {
          type: 'object',
          required: ['createdBy', 'productName', 'productType', 'expiryDate', 'productPrice', 'productDescription', 'quantity'],
          properties: {
            _id: {
              type: 'string',
              description: 'Product ID',
              example: '507f1f77bcf86cd799439012'
            },
            createdBy: {
              type: 'string',
              description: 'ID of user who created the product',
              example: '507f1f77bcf86cd799439011'
            },
            productName: {
              type: 'string',
              description: 'Name of the product',
              example: 'Fresh Apples'
            },
            productType: {
              type: 'string',
              enum: ['new', 'waste'],
              description: 'Type of product - new or waste/expired',
              example: 'new'
            },
            expiryDate: {
              type: 'string',
              format: 'date',
              description: 'Product expiry date',
              example: '2024-12-31'
            },
            productPrice: {
              type: 'number',
              minimum: 0,
              description: 'Product price',
              example: 25.99
            },
            productDescription: {
              type: 'string',
              description: 'Detailed product description',
              example: 'Fresh organic apples from local farm'
            },
            quantity: {
              type: 'number',
              minimum: 1,
              description: 'Available quantity',
              example: 100
            },
            boughtBy: {
              type: 'string',
              nullable: true,
              description: 'ID of user who bought the product',
              example: '507f1f77bcf86cd799439013'
            },
            status: {
              type: 'string',
              enum: ['available', 'sold'],
              description: 'Product availability status',
              example: 'available'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Product creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Product last update timestamp'
            }
          }
        },
        Group: {
          type: 'object',
          required: ['createdBy', 'itemName', 'members', 'expiryDate', 'itemQuantity'],
          properties: {
            _id: {
              type: 'string',
              description: 'Group ID',
              example: '507f1f77bcf86cd799439014'
            },
            createdBy: {
              type: 'string',
              description: 'ID of user who created the group',
              example: '507f1f77bcf86cd799439011'
            },
            itemName: {
              type: 'string',
              description: 'Name of the item for group buying',
              example: 'Bulk Rice Purchase'
            },
            members: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Array of user IDs who are members of the group',
              example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012']
            },
            expiryDate: {
              type: 'string',
              format: 'date',
              description: 'Group expiry date',
              example: '2024-12-31'
            },
            itemQuantity: {
              type: 'number',
              description: 'Total quantity needed for the group',
              example: 1000
            },
            claimedBy: {
              type: 'string',
              nullable: true,
              description: 'ID of seller who claimed the group',
              example: '507f1f77bcf86cd799439015'
            },
            status: {
              type: 'string',
              enum: ['open', 'closed'],
              description: 'Group status',
              example: 'open'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Group creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Group last update timestamp'
            }
          }
        },
        UserSignup: {
          type: 'object',
          required: ['name', 'email', 'password', 'role'],
          properties: {
            name: {
              type: 'string',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com'
            },
            password: {
              type: 'string',
              minLength: 6,
              example: 'securePassword123'
            },
            role: {
              type: 'string',
              enum: ['vendor', 'seller'],
              example: 'vendor'
            }
          }
        },
        UserLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com'
            },
            password: {
              type: 'string',
              example: 'securePassword123'
            }
          }
        },
        ProductCreate: {
          type: 'object',
          required: ['productName', 'productType', 'expiryDate', 'productPrice', 'productDescription', 'quantity'],
          properties: {
            productName: {
              type: 'string',
              example: 'Fresh Apples'
            },
            productType: {
              type: 'string',
              enum: ['new', 'waste'],
              example: 'new'
            },
            expiryDate: {
              type: 'string',
              format: 'date',
              example: '2024-12-31'
            },
            productPrice: {
              type: 'number',
              minimum: 0,
              example: 25.99
            },
            productDescription: {
              type: 'string',
              example: 'Fresh organic apples from local farm'
            },
            quantity: {
              type: 'number',
              minimum: 1,
              example: 100
            }
          }
        },
        GroupCreate: {
          type: 'object',
          required: ['itemName', 'expiryDate', 'itemQuantity'],
          properties: {
            itemName: {
              type: 'string',
              example: 'Bulk Rice Purchase'
            },
            expiryDate: {
              type: 'string',
              format: 'date',
              example: '2024-12-31'
            },
            itemQuantity: {
              type: 'number',
              example: 1000
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
              example: 'Invalid credentials'
            },
            message: {
              type: 'string',
              description: 'Detailed error description',
              example: 'The provided email or password is incorrect'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Success message',
              example: 'Operation completed successfully'
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        }
      }
    },
    paths: {
      '/user/signup': {
        post: {
          tags: ['Authentication'],
          summary: 'Register a new user',
          description: 'Create a new user account for vendor or seller',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserSignup'
                }
              }
            }
          },
          responses: {
            '201': {
              description: 'User created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Success'
                  }
                }
              }
            },
            '400': {
              description: 'Invalid input data',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '409': {
              description: 'User already exists',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/user/login': {
        post: {
          tags: ['Authentication'],
          summary: 'User login',
          description: 'Authenticate user and set session cookie',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserLogin'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Login successful',
              headers: {
                'Set-Cookie': {
                  description: 'JWT token cookie',
                  schema: {
                    type: 'string',
                    example: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; Path=/; HttpOnly'
                  }
                }
              },
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Success'
                  }
                }
              }
            },
            '401': {
              description: 'Invalid credentials',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/user/logout': {
        post: {
          tags: ['Authentication'],
          summary: 'User logout',
          description: 'Clear user session and logout',
          security: [
            {
              cookieAuth: []
            }
          ],
          responses: {
            '200': {
              description: 'Logout successful',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Success'
                  }
                }
              }
            }
          }
        }
      },
      '/product': {
        get: {
          tags: ['Products'],
          summary: 'Get all products',
          description: 'Retrieve list of all available products',
          security: [
            {
              cookieAuth: []
            }
          ],
          responses: {
            '200': {
              description: 'Products retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      products: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Product'
                        }
                      }
                    }
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized - Authentication required',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Products'],
          summary: 'Create new product',
          description: 'Add a new product to the marketplace',
          security: [
            {
              cookieAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ProductCreate'
                }
              }
            }
          },
          responses: {
            '201': {
              description: 'Product created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product'
                  }
                }
              }
            },
            '400': {
              description: 'Invalid input data',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/product/{id}': {
        get: {
          tags: ['Products'],
          summary: 'Get product by ID',
          description: 'Retrieve a specific product by its ID',
          security: [
            {
              cookieAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Product ID',
              schema: {
                type: 'string',
                example: '507f1f77bcf86cd799439012'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Product retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product'
                  }
                }
              }
            },
            '404': {
              description: 'Product not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Products'],
          summary: 'Delete product',
          description: 'Delete a product (only by creator)',
          security: [
            {
              cookieAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Product ID',
              schema: {
                type: 'string',
                example: '507f1f77bcf86cd799439012'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Product deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Success'
                  }
                }
              }
            },
            '403': {
              description: 'Forbidden - Not authorized to delete this product',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '404': {
              description: 'Product not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/product/buy/{id}': {
        post: {
          tags: ['Products'],
          summary: 'Buy product',
          description: 'Purchase a product (vendor only)',
          security: [
            {
              cookieAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Product ID',
              schema: {
                type: 'string',
                example: '507f1f77bcf86cd799439012'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Product purchased successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Success'
                  }
                }
              }
            },
            '403': {
              description: 'Forbidden - Only vendors can buy products',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '404': {
              description: 'Product not found or already sold',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/group': {
        get: {
          tags: ['Groups'],
          summary: 'Get all groups',
          description: 'Retrieve list of all active groups',
          security: [
            {
              cookieAuth: []
            }
          ],
          responses: {
            '200': {
              description: 'Groups retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      groups: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Group'
                        }
                      }
                    }
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Groups'],
          summary: 'Create new group',
          description: 'Create a new group for bulk purchasing (vendor only)',
          security: [
            {
              cookieAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GroupCreate'
                }
              }
            }
          },
          responses: {
            '201': {
              description: 'Group created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Group'
                  }
                }
              }
            },
            '400': {
              description: 'Invalid input data',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '403': {
              description: 'Forbidden - Only vendors can create groups',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/group/{id}': {
        get: {
          tags: ['Groups'],
          summary: 'Get group by ID',
          description: 'Retrieve a specific group by its ID',
          security: [
            {
              cookieAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Group ID',
              schema: {
                type: 'string',
                example: '507f1f77bcf86cd799439014'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Group retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Group'
                  }
                }
              }
            },
            '404': {
              description: 'Group not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Groups'],
          summary: 'Delete group',
          description: 'Delete a group (only by creator, vendor only)',
          security: [
            {
              cookieAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Group ID',
              schema: {
                type: 'string',
                example: '507f1f77bcf86cd799439014'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Group deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Success'
                  }
                }
              }
            },
            '403': {
              description: 'Forbidden - Only group creator can delete',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '404': {
              description: 'Group not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/group/join/{id}': {
        post: {
          tags: ['Groups'],
          summary: 'Join group',
          description: 'Join an existing group (vendor only)',
          security: [
            {
              cookieAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Group ID',
              schema: {
                type: 'string',
                example: '507f1f77bcf86cd799439014'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Successfully joined group',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Success'
                  }
                }
              }
            },
            '403': {
              description: 'Forbidden - Only vendors can join groups',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '404': {
              description: 'Group not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '409': {
              description: 'Already a member of this group',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/group/claim/{id}': {
        post: {
          tags: ['Groups'],
          summary: 'Claim group',
          description: 'Claim a group to fulfill the order (seller only)',
          security: [
            {
              cookieAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Group ID',
              schema: {
                type: 'string',
                example: '507f1f77bcf86cd799439014'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Group claimed successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Success'
                  }
                }
              }
            },
            '403': {
              description: 'Forbidden - Only sellers can claim groups',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '404': {
              description: 'Group not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '409': {
              description: 'Group already claimed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./routers/*.js'] // Path to the API files for additional JSDoc comments
};

const specs = swaggerJSDoc(options);
module.exports = specs;
