const db = require('../db')
const objectId = require('mongodb').ObjectId
const moment = require('moment')
const debug = true

const {
  responses: {
    promises: { successWrap, errorWrap, customWrap },
  },
} = require('../services/dataStructures')

const insert = async (collection, doc) => {
  let ms = null
  if (debug) ms = new Date().getTime()
  if (!doc.createdAt) {
    doc.createdAt = moment().toDate()
  }
  let response = await db.get().collection(collection).insertOne(doc)
  if (debug) console.log('dbDriver insert', collection, new Date().getTime() - ms)
  if (response.acknowledged) {
    return successWrap('OK')
  }
  return errorWrap(`Could not insert into (${collection})`)
}

const find = async (collection, query, options, sort) => {
  let ms = null
  if (debug) ms = new Date().getTime()
  if (options === undefined) {
    options = {}
  }
  if (sort === undefined) {
    sort = {}
  }
  let result = await db.get().collection(collection).find(query, options).sort(sort).toArray()
  if (debug) console.log('dbDriver find', collection, new Date().getTime() - ms)
  if (result) {
    return successWrap(result)
  }
  return errorWrap(`Not found ${collection}`, 404)
}

const count = async (collection, query, options) => {
  let ms = null
  if (debug) ms = new Date().getTime()

  if (options === undefined) {
    options = {}
  }

  let result = await db.get().collection(collection).find(query, options).count()
  if (debug) console.log('dbDriver count', collection, new Date().getTime() - ms)
  return successWrap(result)
}

const findOne = async (collection, query, options) => {
  let ms = null
  if (debug) ms = new Date().getTime()
  if (options === undefined) {
    options = {}
  }
  let result = await db.get().collection(collection).findOne(query, options)
  if (debug) console.log('dbDriver findOne', collection, new Date().getTime() - ms)
  if (result) {
    return successWrap(result)
  }
  return errorWrap(`Not found ${collection}`, 404)
}

const findOneOnId = async (collection, id) => {
  let ms = null
  if (debug) ms = new Date().getTime()
  let result = await findOne(collection, {
    _id: objectId(id),
  })
  if (debug) console.log('dbDriver findOneOnId', collection, new Date().getTime() - ms)
  return customWrap(result)
}

const update = async (collection, query, update, options) => {
  let ms = null
  if (debug) ms = new Date().getTime()
  if (options === undefined) {
    options = {}
  }
  let response = await db.get().collection(collection).updateOne(query, { $set: update }, options)
  if (debug) console.log('dbDriver update', collection, new Date().getTime() - ms)
  if (response.acknowledged) {
    return successWrap('OK')
  }
  return errorWrap(`Could not update (${collection})`)
}

const updateOnId = async (collection, id, update, options) => {
  let ms = null
  if (debug) ms = new Date().getTime()
  let result = module.exports.update(
    collection,
    {
      _id: objectId(id),
    },
    update,
    options
  )
  if (debug) console.log('dbDriver updateOnId', collection, new Date().getTime() - ms)
  return customWrap(result)
}

const findAndModify = async (collection, query, update, options) => {
  let ms = null
  if (debug) ms = new Date().getTime()
  if (options === undefined) {
    options = {}
    options.new = true
    options.upsert = false
  }
  let response = await db
    .get()
    .collection(collection)
    .findOneAndUpdate(query, { $set: update }, options)
  if (debug) console.log('dbDriver findAndModify', collection, new Date().getTime() - ms)
  if (response.acknowledged) {
    return successWrap('OK')
  }
  return errorWrap(`Could not update (${collection}`)
}

const findAndModifyCustom = async (collection, query, update, sort, options) => {
  let ms = null
  if (debug) ms = new Date().getTime()
  if (sort === undefined) {
    sort = []
  }
  if (options === undefined) {
    options = {}
    options.new = true
    options.upsert = false
  }
  let response = await db.get().collection(collection).findAndModify(query, sort, update, options)
  if (debug) console.log('dbDriver findAndModifyCustom', collection, new Date().getTime() - ms)
  if (response.acknowledged) {
    return successWrap('OK')
  }
  return errorWrap(`Could not update (${collection})`)
}

const customUpdate = async (collection, query, update, options) => {
  let ms = null
  if (debug) ms = new Date().getTime()
  let response = await db.get().collection(collection).updateMany(query, update, options)
  if (debug) console.log('dbDriver customUpdate', collection, new Date().getTime() - ms)
  if (response.acknowledged) {
    return successWrap('OK')
  }
  return errorWrap(`Could not update (${collection})`)
}

const deleteOne = async (collection, query) => {
  let ms = null
  if (debug) ms = new Date().getTime()
  let result = await db.get().collection(collection).deleteOne(query)
  if (debug) console.log('dbDriver deleteOne', collection, new Date().getTime() - ms)
  if (result.acknowledged) {
    return successWrap('OK')
  } else {
    return errorWrap(`Not found (${collection})`, 404)
  }
}

const deleteOneOnId = async (collection, id, options) => {
  let ms = null
  if (debug) ms = new Date().getTime()
  let result = module.exports.deleteOne(
    collection,
    {
      _id: objectId(id),
    },
    update,
    options
  )
  if (debug) console.log('dbDriver deleteOneOnId', collection, new Date().getTime() - ms)
  return customWrap(result)
}

const deleteMany = async (collection, query) => {
  let ms = null
  if (debug) ms = new Date().getTime()
  let result = await db.get().collection(collection).deleteMany(query)
  if (debug) console.log('dbDriver deleteMany', collection, new Date().getTime() - ms)
  if (result.acknowledged) {
    return successWrap('OK')
  } else {
    return errorWrap(`Not found (${collection})`, 404)
  }
}

const getDistinct = async (collection, field) => {
  let ms = null
  if (debug) ms = new Date().getTime()
  let noNullQuery = {}
  noNullQuery[field] = { $ne: null }
  let response = await db.get().collection(collection).distinct(field, noNullQuery)
  if (debug) console.log('dbDriver getDistinct', collection, new Date().getTime() - ms)
  if (response) {
    return successWrap(response)
  }
  return successWrap(`Could not get distinct (${collection})`)
}

const aggregate = async (collection, aggregationArray) => {
  let ms = null
  if (debug) ms = new Date().getTime()
  let response = await db.get().collection(collection).aggregate(aggregationArray)
  if (debug) console.log('dbDriver aggregate', collection, new Date().getTime() - ms)
  let ar = await response.toArray()
  if (ar) {
    return successWrap(ar)
  } else {
    return errorWrap(`No results - aggregate (${collection})`, 404)
  }
}

module.exports = {
  insert,
  find,
  count,
  findOne,
  findOneOnId,
  update,
  updateOnId,
  findAndModify,
  findAndModifyCustom,
  customUpdate,
  deleteOne,
  deleteOneOnId,
  deleteMany,
  getDistinct,
  aggregate,
}
