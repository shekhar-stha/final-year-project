const User = require("../models/UserModel")
const Admin = require("../models/AdminModel")
const GymMember = require("../models/GymMemberModel")
const GymTrainer = require("../models/GymTrainerModel")
const Membership = require("../models/MembershipModel")
const MemberSchedule = require("../models/MemberScheduleModel")
const Diet = require("../models/DietModel")
const Products = require("../models/ProductModel")
const Orders = require("../models/OrdersModel")
const ShippingDetails = require("../models/ShippingDetailsModel")
const Notice = require("../models/NoticeModel")
const Checkout = require("../models/CheckoutModel")
const ProductPayment = require("../models/ProductPaymentModel")
const MembershipPayment = require("../models/MembershipPaymentModel")
const Message = require("../models/MessageModel")

User.hasOne(Admin)
Admin.belongsTo(User)

User.hasOne(GymMember)
GymMember.belongsTo(User)

User.hasOne(GymTrainer)
GymTrainer.belongsTo(User)

User.hasOne(Orders)
Orders.belongsTo(User)

Membership.hasOne(GymMember)
GymMember.belongsTo(Membership)

MemberSchedule.hasOne(GymMember)
GymMember.belongsTo(MemberSchedule)

Diet.hasOne(GymMember)
GymMember.belongsTo(Diet)

User.hasMany(ShippingDetails)
ShippingDetails.belongsTo(User)

User.hasOne(Checkout)
Checkout.belongsTo(User)

User.hasOne(Message)
Message.belongsTo(User)

User.hasOne(MembershipPayment)
MembershipPayment.belongsTo(User)

Membership.hasOne(MembershipPayment)
MembershipPayment.belongsTo(Membership)

Products.hasOne(Checkout)
Checkout.belongsTo(Products)

Orders.hasOne(ProductPayment)
ProductPayment.belongsTo(Orders)

Admin.hasOne(Notice)
Notice.belongsTo(Admin)
