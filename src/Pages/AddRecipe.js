import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";

import "./AddRecipe.css";

import PageContent from "../CommonElements/PageContent";
import Card from "../CommonElements/Card";
import SuggestiveInput from "../CommonElements/SuggestiveInput";
import Button from "../CommonElements/Button";
import AddItemButton from "../CommonElements/AddItemButton";

const randomIdPrefix = Date.now().toString(); //To stop browsers from making input suggestions

const AddRecipe = () => {
 const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);

 const [steps, setSteps] = useState([""]);

 const [name, setName] = useState("");

 const [reference, setReference] = useState("");

 const [productsList, setProductsList] = useState();

 useEffect(() => {
  Axios.get(
   `${process.env.REACT_APP_SHOPPIN_BACKEND_URL}/products/eatable`
  ).then(products => {
   setProductsList(products.data.map(product => product.name));
  });
 }, []);

 const handleSuggestiveInputChange = useCallback(inputData => {
  setIngredients(current => {
   const mutableIngredients = [...current];
   mutableIngredients[inputData.index] = {
    name: inputData.value,
    quantity: current[inputData.index].quantity,
   };
   return mutableIngredients;
  });
 }, []);

 const handleAdd = () => {
  setIngredients(current => {
   return [...current, { name: "", quantity: "" }];
  });
 };

 const handleRemove = index => {
  setIngredients(current => {
   const mutableIngredients = [...current];
   mutableIngredients.splice(index, 1);
   return mutableIngredients;
  });
 };

 const handleSave = () => {
  const recipe = {
   ingredients: ingredients,
   name: name,
   steps: steps,
   reference: reference,
  };

  Axios.post(`${process.env.REACT_APP_BACKEND_URL}/recipes/create`, recipe);
 };

 // const handleSubmit = event => {
 //  event.preventDefault();

 //  setFormState(current => {
 //   return {
 //    ...current,
 //    submitting: true,
 //    valuesMissing:
 //     !messageData?.from || !messageData?.subject || !messageData?.body
 //      ? true
 //      : false,
 //   };
 //  });

 //  if (messageData?.from && messageData?.subject && messageData?.body) {
 //   Axios.post(
 //    `${process.env.REACT_APP_BACKEND_URL}/contactMe/`,
 //    messageData
 //   ).then(result => {
 //    if (result.status === 200) {
 //     setFormState(current => {
 //      return {
 //       ...current,
 //       submittedSuccessfully: true,
 //      };
 //     });

 //     setTimeout(() => {
 //      setFormState(current => {
 //       return {
 //        ...current,
 //        submitting: false,
 //        submittedSuccessfully: null,
 //       };
 //      });

 //      setMessageData(null);
 //     }, 2000);
 //    }
 //   });
 //  } else {
 //   setTimeout(() => {
 //    setFormState(current => {
 //     return {
 //      ...current,
 //      submitting: false,
 //      valuesMissing: false,
 //      submittedSuccessfully: null,
 //     };
 //    });
 //   }, 2000);
 //  }
 // };

 if (!productsList) {
  return <div>Loading...</div>;
 }

 return (
  <PageContent className="add-recipe">
   <h1>Add recipe</h1>
   <h2>Name</h2>
   <Card>
    <input
     type="text"
     value={name}
     onChange={event => {
      setName(event.target.value);
     }}
     placeholder="Name"
    />
   </Card>
   <Card>
    <input
     type="text"
     value={reference}
     onChange={event => {
      setReference(event.target.value);
     }}
     placeholder="Reference"
    />
   </Card>
   <ul>
    <h2>Ingredients</h2>
    {ingredients?.map((ingredient, index) => {
     return (
      <li key={index}>
       <Card direction="row">
        <SuggestiveInput
         id={`${randomIdPrefix}-${index}`}
         value={ingredient.name}
         placeholder="Ingredient"
         options={productsList}
         onInputChange={handleSuggestiveInputChange}
        />
        <input
         type="number"
         value={ingredient.quantity}
         placeholder="Quantity [g]"
         onChange={event =>
          setIngredients(current => {
           const mutableIngredients = [...current];
           mutableIngredients[index] = {
            name: current[index].name,
            quantity: event.target.value,
           };
           return mutableIngredients;
          })
         }
        />
        <Button
         variant="negative"
         onClick={() => handleRemove(index)}
        >
         Remove
        </Button>
       </Card>
      </li>
     );
    })}
    <AddItemButton onClick={handleAdd} />
   </ul>
   <ul>
    <h2>Steps</h2>
    {steps.map((step, index) => {
     return (
      <li key={index}>
       <Card direction="row">
        <input
         value={step}
         placeholder="Step"
         onChange={event => {
          setSteps(current => {
           const mutableSteps = [...current];
           mutableSteps[index] = event.target.value;
           return mutableSteps;
          });
         }}
        />
        <Button
         variant="negative"
         onClick={() => {
          setSteps(current => {
           const mutableSteps = [...current];
           mutableSteps.splice(index, 1);
           return mutableSteps;
          });
         }}
        >
         Remove
        </Button>
       </Card>
      </li>
     );
    })}
    <AddItemButton
     onClick={() =>
      setSteps(current => {
       return [...current, ""];
      })
     }
    />
   </ul>
   <Button
    variant="neutral"
    onClick={handleSave}
   >
    Save recipe
   </Button>
  </PageContent>
 );
};

export default AddRecipe;
