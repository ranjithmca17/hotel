import axios from "axios";
import React, { useState } from 'react';
import "./Add.css";
import { assets } from "../../assets/assets.js";

export default function Add({url}) {

    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });
    const [error, setError] = useState("");

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    }

    const onImageChange = (event) => {
        // if (event.target.files.length > 0) {
            setImage(event.target.files[0]);
        // }
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category', data.category);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.sucess) {
                // Reset the form and image state
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImage(null);
                alert("product added successfully")
                setError(""); // Clear error message on success
            } else {
                setError('Failed to add food item. Please try again.');
            }
        } catch (error) {
            // Log and set error message
            console.error('Error during submission:', error);
            setError('An error occurred while adding the food item. Please try again.');
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload Preview" />
                    </label>
                    <input 
                        type="file" 
                        id='image' 
                        hidden 
                        onChange={onImageChange} 
                        required 
                    />
                </div>
                <div className="add-product-name flex-col">
                    <input 
                        type="text" 
                        onChange={onChangeHandler} 
                        value={data.name} 
                        name='name' 
                        placeholder='Type here' 
                    />
                </div>
                <div className="add-product-description">
                    <p>Product Description</p>
                    <textarea 
                        name="description" 
                        onChange={onChangeHandler} 
                        value={data.description} 
                        rows='6' 
                        placeholder='Write content here'
                    ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select 
                            onChange={onChangeHandler} 
                            name="category" 
                            value={data.category}
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input 
                            type="number" 
                            onChange={onChangeHandler} 
                            value={data.price} 
                            name='price' 
                            placeholder='$20' 
                        />
                    </div>
                </div>
                <button type='submit' className='add-btn'>Add</button>
                {error && <p className='error-message'>{error}</p>}
            </form>
        </div>
    );
}
