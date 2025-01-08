import React, { useState } from "react";

export default function AddProductsModal({
  lead,
//   updateLeadActivityTimeline,
  updateLeadProductTimeline,
  handleClose,
//   productFormData
}) {
//   console.log("lead from on add products:", lead);

  const [assignedTo, setAssignedTo] = useState("");
//   const [itemCode, setItemCode] = useState("");
//   const [itemDescription, setItemDescription] = useState("");
//   const [itemUnit, setItemUnit] = useState("");
//   const [itemCurrentStock, setItemCurrentStock] = useState("");
//   const [itemQuantity, setItemQuantity] = useState("");
//   const [itemPrice, setItemPrice] = useState("");
//   const [itemAmount, setItemAmount] = useState("");

const [productFormData , setProductFormData] = useState({
    itemCode:'',
    itemDescription:'',
    itemUnit:'',
    itemCurrentStock:'',
    itemQuantity:'',
    itemPrice:'',
    itemAmount:'',
})

const handleChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }; 

  const handleSubmit = () => {
    // if (!assignedTo) {
    //   alert("Please select or enter a person to assign the lead.");
    //   return;
    // }

    // console.log('productFormData:',productFormData)






    const currentTimestamp = new Date().toISOString();

    const leadProductEntry = {
      date: new Date(currentTimestamp).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
      activity: "Lead Product Added",
      notes: `Lead Product added to ${lead}.`, //add notes item description
      productDetails: {productFormData}
    };

    // updateLeadActivityTimeline(lead.id, leadProductEntry);
    // updateLeadProductTimeline(lead, leadProductEntry);
    updateLeadProductTimeline(leadProductEntry);
    // console.log('lead: from modal',lead)
    // console.log('lead.id: from modal',lead.id)
    handleClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[40vw] p-6">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-semibold">Add Products</h2>
          <button onClick={handleClose} className="text-2xl">
            &times;
          </button>
        </div>

        <p className="my-2 ">
          Add Products to: <strong>{lead}</strong>
        </p>

{[
    {label:'Item Code',name:'itemCode',placeholder:'Enter Item Code',type:'text'},
    {label:'Item Description',name:'itemDescription',placeholder:'Enter Item Description',type:'text'},
    {label:'Item Unit',name:'itemUnit',placeholder:'Enter Item Unit',type:'text'},
    {label:'Item Current Stock',name:'itemCurrentStock',placeholder:'Enter Item Current Stock',type:'number'},
    {label:'Item Quantity',name:'itemQuantity',placeholder:'Enter Item Quantity',type:'number'},
    {label:'Item Price',name:'itemPrice',placeholder:'Enter Item Price',type:'number'},
    {label:'Item Amount',name:'itemAmount',placeholder:'Enter Item Amount',type:'number'},
].map((field,index)=>(

        <div key={index} className="flex gap-1 items-center mb-2">
          <label className="w-1/2 text-left  font-medium mb-2">{field.label} </label>
          <input
            type={field.type}
            name={field.name}
            value={productFormData[field.name]}
            placeholder={field.placeholder}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg py-2"
            />
        </div>
))}

        {/* <div className="flex items-center mb-2">
          <label className="w-1/2 font-medium mb-2">Description : </label>
          <input
            type="text"
            name="itemDescription"
            placeholder="Enter Item Description"
            value={itemDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            />
        </div>

        <div className="flex items-center mb-2">
          <label className="w-1/2 font-medium mb-2">Unit : </label>
          <input
            type="text"
            name="itemUnit"
            placeholder="Enter Item Units"
            value={itemUnit}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            />
        </div>

        <div className="flex items-center mb-2">
          <label className="w-1/2 font-medium mb-2">Current Stock : </label>
          <input
            type="text"
            name="itemCurrentStock"
            placeholder="Enter Current Stock"
            value={itemCurrentStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            />
        </div>

        <div className="flex items-center mb-2">
          <label className="w-1/2 font-medium mb-2">Quantity : </label>
          <input
            type="text"
            name="itemQuantity"
            placeholder="Enter Product Quantity"
            value={itemQuantity}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            />
        </div>

        <div className="flex items-center mb-2">
          <label className="w-1/2 font-medium mb-2">Price : </label>
          <input
            type="text"
            placeholder="Enter Product Price"
            name="itemPrice"
            value={itemPrice}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            />
        </div>

        <div className="flex items-center mb-2">
          <label className="w-1/2 font-medium mb-2">Amount : </label>
          <input
            type="text"
            placeholder="Enter Product Amount"
            name="itemAmount"
            value={itemAmount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div> */}

        <div className="flex justify-center items-center gap-4 mt-3 pt-3 ">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-lg"
          >
            Submit
          </button>
          <button onClick={handleClose} className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
