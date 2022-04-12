import React, { useRef } from "react";
import module from "./addRecipe.module.css";
import { GiCancel } from "react-icons/gi";

const AddRecipe = (props) => {
  const recipeName = useRef();
  const recipeIngredients = useRef();
  const recipeDirections = useRef();

  function onAddClickHandler() {
    if (recipeName.current.value.trim() === "") {
      alert("please enter recipe name");
    } else if (recipeIngredients.current.value.trim() === "") {
      alert("please enter recipe ingredients");
    } else if (recipeDirections.current.value.trim() === "") {
      alert("please enter recipe directions");
    } else {
      const newRecipe = {
        title: recipeName.current.value,
        ingredients: recipeIngredients.current.value.split("\\"),
        directions: recipeDirections.current.value.split("\\"),
      };

      props.recipesArr.push(newRecipe);
      localStorage.setItem("recipes", JSON.stringify(props.recipesArr));
      props.setDisplayAddRecipe(false);
    }
  }

  return (
    <div
      className={module.mainContainerDiv}
      // onClick={() => props.setDisplayAddRecipe(false)}
    >
      <div className={module.cardDiv}>
        <div className={module.cardTitleDiv}>
          <GiCancel
            style={{ cursor: "pointer", fontSize: "20px", color: "black" }}
            onClick={() => props.setDisplayAddRecipe(false)}
          />
        </div>
        <div className={module.cardBodyDiv}>
          <div className={module.cardTitle}>Add recipe</div>
          <div className={module.cardRecipeTitle}>
            <div>Recipe</div>
            <input
              style={{ width: "100%" }}
              placeholder="Recipe name"
              ref={recipeName}
            />
          </div>
          <div className={module.cardIngredients}>
            <div style={{ marginTop: "20px" }}>Ingredients</div>
            <textarea
              cols={5}
              style={{ width: "100%" }}
              placeholder="separate each ingredient with a '\' : 
              Milk \ 2 eggs \ 1/3 cup sugar"
              ref={recipeIngredients}
            />
          </div>
          <div className={module.cardDirections}>
            <div style={{ marginTop: "20px" }}>Directons</div>
            <textarea
              cols={5}
              style={{ minWidth: "100%" }}
              placeholder='separate each direction with a "\" : 
              proheat oven with 360 \ combine ingredient in pie crust'
              ref={recipeDirections}
            />
          </div>
          <div className={module.cardButtons}>
            <button onClick={onAddClickHandler}>add</button>
            <button onClick={() => props.setDisplayAddRecipe(false)}>
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
