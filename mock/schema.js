var schema = {
  "type": "object",
  "properties": {
    account: {
      "type": "object",
      "properties": {
        "staked": {
          "type": "number",
          "faker": "finance.amount"
        },
        "total": {
          "type": "number",
          "faker": "finance.amount"
        }
      }
    },
    transactions: {
      "type": "array",
      "minItems": 3,
      "maxItems": 5,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "unique": true,
            "minimum": 1
          },
          "amount": {
            "type": "number",
            "faker": "finance.amount"
          },
          "date": {
            "type": "string",
            "faker": "date.past"
          },
          "direction": {
            "type": "boolean",
            "faker": "random.boolean"
          },
          "memo": {
            "type": "string",
            "faker": "random.words"
          },
          "sender": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number",
                "unique": true,
                "minimum": 1
              },
              "name": {
                "type": "string",
                "faker": "name.firstName"
              },
              "photo": {
                "type": "string",
                "faker": "image.imageUrl"
              }
            },
            "required": ["id", "name", "photo"]
          }
        },
        "required": ["id", "type", "amount", "date", "direction", "memo", "sender"]
      }
    },
    users: {
      "type": "array",
      "minItems": 3,
      "maxItems": 5,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "unique": true,
            "minimum": 1
          },
          "display_name": {
            "type": "string",
            "faker": "name.firstName"
          },
          "photo": {
            "type": "string",
            "faker": "image.imageUrl"
          },
          "email": {
            "type": "string",
            "faker": "internet.email"
          }
        },
        "required": ["id", "type", "display_name", "email", "photo"]
      }
    },
  },
  "required": ["account", "transactions", "users"]
};


// "account_name": "nujabes",
// "display_name": "",
// "image_url": "",
// "website": "",
// "auth": {}

module.exports = schema;