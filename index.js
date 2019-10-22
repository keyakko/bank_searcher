/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.bankSearch = (req, res) => {
  const zengin_code = require('zengin-code')
  const result = {}
  const search_string = req.query.name || req.body.name || ""
  let   base_string = ""

  if (search_string != "") {
    Object.keys(zengin_code).forEach((key) => {
      base_string = zengin_code[key].name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
      }) + "銀行"
      if (base_string.includes(req.query.name)) {
        result[key] = zengin_code[key]
        delete result[key].branches
      }
    })
  }

  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  res.status(200).json({
    result: result
  })
  // let message = req.query.message || req.body.message || 'Hello World!';
  // res.status(200).send(message);
};
