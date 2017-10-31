/**
 * @api {PARAM} Filter Filter 
 * @apiGroup Collection Params 
 * @apiDescription
 * Filter expressions allow narrowing collection requests based on search criteria using any field name 
 * available in the entities served by the endpoint. Possible filter operations are:
 *
 * | Param                | Example                  | Description     |
 * |----------------------|--------------------------|-----------------|
 * | `key=val`            | `type=public`            | field equals value |
 * | `key>val`            | `count>5`                | field greater-than value |
 * | `key>=val`           | `rating>=9.5`            | field greater-than or equal to value |
 * | `key<val`            | `createdAt<2016-01-01`   | field less-than value |
 * | `key<=val`           | `score<=-5`              | field less-than or equal to value |
 * | `key!=val`           | `status!=success`        | field is not equal to value |
 * | `key=val1,val2`      | `country=GB,US`          | field equals one of the values |
 * | `key!=val1,val2`     | `lang!=fr,en`            | field not equal one of the values |
 * | `key`                | `phone`                  | field value exists (not empty) |
 * | `!key`               | `!email`                 | field value doesn't exists (is empty) |
 * | `key=/value/<opts>`  | `email=/@gmail\.com$/i`  | field matches regular expression |
 * | `key!=/value/<opts>` | `phone!=/^06/`           | field does not match regular expression |
 *
 * For advanced usage (`$or`,`$and`,`$type`,`$elemMatch`), pass any MongoDB query filter object as
 * a JSON string in a query parameter named `filter`.
 * 
 * You can reference nested document fields using `.` notation, ie `message.message_id` for both
 * single nested objects, or arrays of nested objects (like messages in a transaction). If referencing
 * a nested field in an array of nested documents, the filter will apply to all members of the array.
 * 
 * @apiParamExample Param Example:
 *  ?block_num>10
 *  ?account=inita&createdAt>=2017-11-04
 *  ?filter={"$or":[{"key1":"value1"},{"key2":"value2"}]}
 */

/**
 * @api {PARAM} Sort Sort
 * @apiGroup Collection Params 
 * @apiDescription
 * Allows sorting the returned entities. It accepts a comma-separated list of fields. 
 * Default behavior is to sort in ascending order. Use `-` prefixes to sort in descending order.
 * 
 * You can reference nested document fields using `.` notation, ie `message.message_id` for both
 * single nested objects, or arrays of nested objects (like messages in a transaction). If referencing
 * a nested field in an array of nested documents, the sort will apply to all members of the array.
 * 
 * @apiParamExample {String} Example query string:
 *    ?sort=-points,createdAt
 * 
 */

/**
 * @api {PARAM} Paging Paging
 * @apiGroup Collection Params 
 * @apiDescription
 * Allows for paging of the returned results of a collection endpoint. `skip` denotes the zero
 * based number of records to skip, so `skip=0` will start at the first entity returned from the collection
 * and `skip=40` would start at the 41st entity. The `limit` param determines how many results are
 * returned from the query on the collection.
 * 
 * @apiParam {Number={0..}} [skip=0] number of entities to skip in collection
 * @apiParam {Number={1..}} [limit=30] number of results to return in collection
 * @apiParamExample {String} Example query string:
 *    ?skip=10&limit=50
 * 
 */

/**
 * @api {PARAM} Fields Fields
 * @apiGroup Collection Params 
 * @apiDescription
 * By default, all fields on collection entities are returned, including nested entities. The `fields` query
 * param allows you to specify the exact fields to return in the resulting records, or specify fields to leave
 * out of the resulting records.
 * 
 * - Useful to limit fields to return in each records.
 * - It accepts a comma-separated list of fields. Default behavior is to specify fields to return. 
 * - Use `-` prefixes to return all fields except some specific fields.
 * - Due to a MongoDB limitation, you cannot combine inclusion and exclusion semantics in a single projection with the exception of the _id field.
 * 
 * You can reference nested document fields using `.` notation, ie `message.message_id` for both
 * single nested objects, or arrays of nested objects (like messages in a transaction). If referencing
 * a nested field in an array of nested documents, this will include/exclude those fields from *all*
 * sub documents in the array.
 * 
 * @apiParam {String} [fields] specific fields to include, or exclude (using `-` prefix)
 * @apiParamExample {String} Example query string:
 *    ?fields=block_id,prev_block_id
 *    ?fields=-block_num
 * 
 */

/**
  * @apiDefine CollectionParams
  * @apiParam  {[Filter](#api-Collection_Params-ParamFilter)} [mixed] one or more expressions to filter on valid fieldnames, ie. <code>key&lt;op&gt;value</code>
  * @apiParam  {[Sort](#api-Collection_Params-ParamSort)="field","-field"} [sort] allows sorting, asc/desc, by one or more fields
  * @apiParam  {[Paging](#api-Collection_Params-ParamPaging)} [skip=0] allows paging of the returned collection entities
  * @apiParam  {[Paging](#api-Collection_Params-ParamPaging)} [limit=30] allows paging of the returned collection entities
  * @apiParam {[Fields](#api-Collection_Params-ParamFields)} [fields] specify exactly what fields in the entities to include, or exclude (using `-` prefix)
  */

/** 
 * @apiDefine FieldParam
 * @apiParam {[Fields](#api-Collection_Params-ParamFields)} [fields] specify exactly what fields in the entities to include, or exclude (using `-` prefix)
 */

//
// Entity Models returned by API
//

/**
 * @apiDefine MessageModel A transaction message model
 * @apiSuccess {String} message._id   unique message identifier (system defined)
 * @apiSuccess {Number} message.message_id  ordinal message identifier within it's transaction
 * @apiSuccess {String} message.transaction_id  unique 64-byte, hex identifier of parent transaction
 * @apiSuccess {Object[]} message.authorization list of authorizations on this message
 * @apiSuccess {String} message.authorization.account  the authorized EOS account name
 * @apiSuccess {String} message.authorization.permission the permission this account is authorized to perform
 * @apiSuccess {String} message.handler_account_name the EOS account name handling this message
 * @apiSuccess {String} message.type the type of message, ie (`transfer`,`createAccount`)
 * @apiSuccess {Object} message.data an object containing the data for this message, sepcific to the type of message
 * @apiSuccess {Date} message.createdAt the date/time this message was created
 */

/**
 * @apiDefine TransactionModel A transaction object
 * @apiSuccess {Object} transaction
 * @apiSuccess {String} transaction._id             unique record id from db
 * @apiSuccess {String} transaction.transaction_id  unique, 64 byte hex identifier
 * @apiSuccess {Number} transaction.sequence_num    ordinal sequence number for this transaction within the block
 * @apiSuccess {String} transaction.block_id        unique, 64-byte block identifier for this transaction's parent block
 * @apiSuccess {Number} transaction.ref_block_num   transaction reference block number
 * @apiSuccess {String} transaction.ref_block_prefix  transaction reference block prefix
 * @apiSuccess {String[]} transaction.scope         list of EOS accounts in scope for this transaction
 * @apiSuccess {String[]} transaction.read_scope    list of EOS accounts in read-only scope for this transaction
 * @apiSuccess {Date} transaction.expiration        the expiration date/time of this transaction
 * @apiSuccess {String[]} transaction.signatures    list of 64-byte hex signatures 
 * @apiSuccess {Object[]} transaction.messages      array of messages in this transaction
 * @apiSuccess {String} transaction.messages._id   unique message identifier (system defined)
 * @apiSuccess {Number} transaction.messages.message_id  ordinal message identifier within it's transaction
 * @apiSuccess {String} transaction.messages.transaction_id  unique 64-byte, hex identifier of parent transaction
 * @apiSuccess {Object[]} transaction.messages.authorization list of authorizations on this message
 * @apiSuccess {String} transaction.messages.authorization.account  the authorized EOS account name
 * @apiSuccess {String} transaction.messages.authorization.permission the permission this account is authorized to perform
 * @apiSuccess {String} transaction.messages.handler_account_name the EOS account name handling this message
 * @apiSuccess {String} transaction.messages.type the type of message, ie (`transfer`,`createAccount`)
 * @apiSuccess {Object} transaction.messages.data an object containing the data for this message, sepcific to the type of message
 * @apiSuccess {Date} transaction.messages.createdAt the date/time this message was created
 * @apiSuccess {Date} transaction.createdAt         the date/time this transaction was created
 * 
 */

/**
  * @apiDefine BlockModel A block object
  * @apiSuccess {String}     _id                     Block's system identifier
  * @apiSuccess  {String}    block_id              Block identifier id (64-byte, hex)
  * @apiSuccess  {Number}    block_num             Block sequential number
  * @apiSuccess  {String}    prev_block_id         Previous Block identifier (64-byte, hex)
  * @apiSuccess  {Date}      timestamp             Timestamp of block creation
  * @apiSuccess  {String}    transaction_merkle_root  Block's merkel root for transactions (64-byte, hex)
  * @apiSuccess  {String}    producer_account_id   Block producer's account id
  * @apiSuccess {Object[]} transactions             Array of transaction objects for this block
  * @apiSuccess {String} transactions._id             unique record id from db
  * @apiSuccess {String} transactions.transaction_id  unique, 64 byte hex identifier
  * @apiSuccess {Number} transactions.sequence_num    ordinal sequence number for this transaction within the block
  * @apiSuccess {String} transactions.block_id        unique, 64-byte block identifier for this transaction's parent block
  * @apiSuccess {Number} transactions.ref_block_num   transaction reference block number
  * @apiSuccess {String} transactions.ref_block_prefix  transaction reference block prefix
  * @apiSuccess {String[]} transactions.scope         list of EOS accounts in scope for this transaction
  * @apiSuccess {String[]} transactions.read_scope    list of EOS accounts in read-only scope for this transaction
  * @apiSuccess {Date} transactions.expiration        the expiration date/time of this transaction
  * @apiSuccess {String[]} transactions.signatures    list of 64-byte hex signatures 
  * @apiSuccess {String[]} transactions.messages      array of message `_id`'s in this transaction
  * @apiSuccess {Date} transactions.createdAt         the date/time this transaction was created
  * @apiSuccess {Date}       createdAt               Created Timestamp (system)
  */
