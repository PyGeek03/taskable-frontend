(exports.nameRules = [v => !!v || "Name is required"]),
  (exports.emailRules = [
    v => !!v || "Email is required",
    v =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "Email must be valid"
  ]);

exports.passwordRules = [v => !v || v.length >= 8 || "Minimum 8 characters"];

exports.phoneRules = [
  v => !!v || "Phone number is required",
  v => /^\d{10}$/.test(v) || "Phone number must be valid"
];
