"use client";
import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { Card, CardHeader, CardFooter } from "../../components/ui/card"; // Update import paths as necessary
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

interface FormData {
  username: string;
  email: string;
  password: string;
  image: File | null;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    image: null,
  });

  const [uploading, setUploading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSignup = async () => {
    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }

    try {
      setUploading(true);

      // Upload image to Cloudinary
      const imageData = new FormData();
      imageData.append("file", formData.image);
      imageData.append("upload_preset", "userimage"); // Your upload preset
      imageData.append("folder", "users"); // Cloudinary folder name

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dr8hssrjw/upload",
        imageData
      );

      const imageUrl: string = uploadResponse.data.secure_url;

      // Include the uploaded image URL in the user data
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        imageUrl,
      };

      console.log("User Data:", userData);

      // Make a POST request to the signup endpoint
      await axios.post("http://localhost:3001/api/user/signup", userData);

      alert("Signup successful!");
    } catch (error) {
      console.error("Error uploading image or signing up:", error);
      alert("Error signing up. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mx-auto p-20">
      <Card className="p-4 flex flex-col items-start justify-center gap-4 w-1/4">
        <CardHeader className="text-3xl font-bold text-center mx-auto">
          Signup New User
        </CardHeader>

        <Label htmlFor="username">Username:</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Enter your username"
        />

        <Label htmlFor="email">Email:</Label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
        />

        <Label htmlFor="password">Password:</Label>
        <Input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
        />

        <Label htmlFor="image">Upload Image:</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <CardFooter className="flex flex-col">
          <div className="flex flex-col justify-between gap-4">
            <Button disabled={uploading}>Login</Button>
            <Button onClick={handleSignup} disabled={uploading}>
              {uploading ? "Uploading..." : "Signup"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
