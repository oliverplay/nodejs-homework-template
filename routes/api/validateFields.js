// const validateFields = () => {
//   const key = Object.keys(
//     validate.error._original
//   ).find(key => {
//     return validate.error._original[key] === undefined;
//   });
//   if (key) {
//     return true;
//   }
//   return false;
// };
// const isMissing = validateFields();
// if (isMissing) {
//   const missingKeys = [];
//   Object.keys(validate.error._original).forEach(key => {
//     if (!validate.error._original[key]) {
//       missingKeys.push(key);
//     }
//   });
//   const message =
//     'Required fields missing: ' +
//     missingKeys.join(', ');
//   res.status(400).json({ message: message });
// } else {
//   res
//     .status(400)
//     .json({ message: validate.error.message });
// }

// module.export = validateFields;
