const item = [
  { id: 1, name: 'Sofa' },
  { id: 2, name: 'Chair' },
]

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(item),
  }
}
