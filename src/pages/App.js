import module from "./mainPage.module.css";
import { AiFillFire, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { GoDiffAdded } from "react-icons/go";
import { useState } from "react";
import AddRecipe from "../models/addRecipe";
import ModifyRecipe from "../models/modifyRecipe";
var recipesArr = [
  {
    title: "hamburger",
    ingredients: [
      "1/8 cup red wine vinegar",
      "1/2 lime, juiced",
      "lime juice",
      "sugar",
      "salt",
      "lime juice",
      "sugar",
      "salt",
    ],
    directions: [
      "Saute chicken in a medium saucepan over medium high heat for about 20 minutes",
      "Add vinegar",
      "lime juice",
      "sugar",
      "salt",
    ],
  },
  { title: "pizza", ingredients: [], directions: [] },
  { title: "meat", ingredients: [], directions: [] },
  { title: "milk", ingredients: [], directions: [] },
  { title: "tea", ingredients: [], directions: [] },
];
if (localStorage.getItem("recipes") !== null)
  recipesArr = JSON.parse(localStorage.getItem("recipes"));
else localStorage.setItem("recipes", JSON.stringify(recipesArr));
function App() {
  const [selectedRecipe, setSelectedRecipe] = useState({
    title: "",
    ingredients: [],
    directions: [],
  });
  const [displayAddRecipe, setDisplayAddRecipe] = useState(false);
  const [displayModifyRecipe, setDisplayModifyRecipe] = useState(false);

  function OnDeleteRecipeHandler() {
    if (selectedRecipe.title !== "") {
      const result = window.confirm("Are sure you want to delete the recipe");
      if (result) {
        recipesArr.splice(recipesArr.indexOf(selectedRecipe), 1);
        // setSelectedRecipe(
        //   recipesArr.filter((item) => item.title !== selectedRecipe.title)
        // );
        setSelectedRecipe({ title: "", ingredients: [], directions: [] });
      }
    }
  }

  function onModifyRecipeClicked() {
    setDisplayModifyRecipe(!displayModifyRecipe);
  }

  return (
    <div className={module.mainContainer}>
      <div className={module.titleDiv}>
        (<AiFillFire />) Recipe box
      </div>
      <div className={module.recipesTitlesDiv}>
        <table className={module.recipesTitlesTbl}>
          {recipesArr.map((item) => (
            <tr key={item.title}>
              <td
                onClick={() => {
                  setSelectedRecipe(item);
                }}
              >
                {item.title}
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className={module.recipesDetailsDiv}>
        <div className={module.detailsHeader}>
          {selectedRecipe.title}{" "}
          <AiFillDelete
            className={module.iconsStyling}
            onClick={OnDeleteRecipeHandler}
          />
          <AiFillEdit
            className={module.iconsStyling}
            onClick={onModifyRecipeClicked}
          />
        </div>
        <div className={module.detailsBody}>
          <div style={{ marginLeft: "7px", paddingTop: "15px" }}>
            Ingredients :{" "}
          </div>
          <div style={{ marginLeft: "17px", marginTop: "5px" }}>
            {selectedRecipe.ingredients.length === 0 ? (
              <li></li>
            ) : (
              selectedRecipe.ingredients.map((ingredient) => (
                <li key={selectedRecipe.ingredients.indexOf(ingredient)}>
                  {ingredient}
                </li>
              ))
            )}
          </div>
          <div style={{ marginLeft: "7px", paddingTop: "15px" }}>
            Directions :{" "}
          </div>
          <div style={{ marginLeft: "17px", marginTop: "5px" }}>
            {selectedRecipe.directions.length === 0 ? (
              <li></li>
            ) : (
              selectedRecipe.directions.map((direction) => (
                <li key={selectedRecipe.directions.indexOf(direction)}>
                  {direction}
                </li>
              ))
            )}
          </div>
        </div>
        <div className={module.detailsFooter}>
          <GoDiffAdded
            className={module.iconsStyling}
            onClick={() => setDisplayAddRecipe(!displayAddRecipe)}
          />
        </div>
      </div>
      {displayAddRecipe ? (
        <AddRecipe
          setDisplayAddRecipe={setDisplayAddRecipe}
          recipesArr={recipesArr}
        />
      ) : null}
      {displayModifyRecipe ? (
        <ModifyRecipe
          setDisplayModifyRecipe={setDisplayModifyRecipe}
          recipesArr={recipesArr}
          selectedRecipe={selectedRecipe}
          setSelectedRecipe={setSelectedRecipe}
        />
      ) : null}
    </div>
  );
}

export default App;
