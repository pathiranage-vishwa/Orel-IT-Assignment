import Products from "../models/productModel.js";
import User from "../models/userModel.js";
const date = new Date();
const savedDate = date;

//Add a post
export const addPost = async (req, res) => {
  try {
    const { userId, picture,savedBy,description } = req.body;
    await User.findById(userId);
    const newPost = new Products({
      userId,
      picture,
      savedDate,
      savedBy,
      description,
      price,
    });
    await newPost.save();

    const post = await Products.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


export const getRecommendedProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter or default to 1
    const perPage = 10; // Define the number of items per page

    // Calculate the skip value to paginate the results
    const skip = (page - 1) * perPage;

    // Use the Mongoose .find() method with skip and limit to retrieve paginated data
    const products = await Products.find()
      .skip(skip)
      .limit(perPage);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get details for particular product

export const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


