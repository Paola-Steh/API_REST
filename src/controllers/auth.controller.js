const User = require('../models/user.model');
const { registerSchema, loginSchema } = require('../validators');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ success:false, message: error.message });

    const existing = await User.findOne({ email: value.email });
    if (existing) return res.status(422).json({ success:false, message: 'Email already in use' });

    const user = new User(value);
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ success:true, data: { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ success:false, message: error.message });

    const user = await User.findOne({ email: value.email }).select('+password');
    if (!user) return res.status(401).json({ success:false, message: 'Invalid credentials' });

    const valid = await user.comparePassword(value.password);
    if (!valid) return res.status(401).json({ success:false, message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ success:true, data: { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token } });
  } catch (err) {
    next(err);
  }
};
