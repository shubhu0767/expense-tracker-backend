import { ApiError } from "../utilis/ApiError.js";
import { asyncHandler } from "../utilis/asyncHandler.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { uploadFileOnCloudinary } from "../utilis/cloudnary.js";
import { Expense } from "../models/expense.model.js";

const saveOrUpdateExpense = asyncHandler(async (req, res) => {
  // check mandatory fields
  // check access token and username
  // check if user is authenticated using access token
  // find user by username
  // if id is not provided then create a new expense entity
  // if id is provided then update the existing expense entity
  // save the expense entity
  // return the updated or saved expense entity

  const { _id, title, amount, date, description, category, phoneNumber, seatNumber } = req.body;
  const { user } = req;

  if (!title || !amount || !date || !category) {
    throw new ApiError(400, "* field are required");
  }

  //   if (!username) {
  //     throw new ApiError(400, "username is required");
  //   }

  if (_id) {
    const existedExpense = await Expense.findOne({ _id });

    const newExpenseObj = {
      title: title || existedExpense.title,
      amount: amount || existedExpense.amount,
      date: new Date(date) || existedExpense.date,
      description: description || existedExpense.description,
      category: category || existedExpense.category,
      userId: user._id,
      userPhoto: existedExpense.userPhoto,
      phoneNumber: phoneNumber || existedExpense.phoneNumber,
      seatNumber: seatNumber || existedExpense.seatNumber,
      _id: _id,
    };

    const updatedExpense = await Expense.findByIdAndUpdate(
      existedExpense._id,
      newExpenseObj,
      {
        new: true,
      }
    );

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedExpense, "Expense updated successfully")
      );
  }

  const userPhotoPath = req.files?.userPhoto[0]?.path;

  if (!userPhotoPath) {
    throw new ApiError(400, "No avator Image");
  }

  const userPhoto = await uploadFileOnCloudinary(userPhotoPath);

  const expense = await Expense.create({
    userId: user._id,
    title: title,
    amount: amount,
    date: new Date(date),
    description: description,
    category: category,
    userPhoto: userPhoto.url,
    phoneNumber: phoneNumber,
    seatNumber: seatNumber,
  });

  const updatedExpense = await Expense.findById(expense._id);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedExpense, "Expense created successfully"));
});

const getExpenses = asyncHandler(async (req, res) => {
  const { user } = req;
  const expenses = await Expense.find({ userId: user._id });

  return res
    .status(200)
    .json(new ApiResponse(200, expenses, "Expenses fetched successfully"));
});

const deleteExpense = asyncHandler(async (req, res) => {
  const { user } = req;
  const { expenseId } = req.params;

  const expense = await Expense.findByIdAndDelete(expenseId);

  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  const updatedExpense = await Expense.find({ userId: user._id });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedExpense, "Expense deleted successfully"));
});

export { saveOrUpdateExpense, getExpenses, deleteExpense };
