import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard, deleteFirstCard, deleteLastCard, store } from ".";
import Card from "./components/Card";

function Home() {
  // const [data, setData] = useState(CARDS_DATA);
  const data = useSelector((state) => state);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [position, setPosition] = useState();

  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleDelete = (id) => {
    const copiedArray = [...data];
    const filteredArray = copiedArray.filter((item) => item.id !== id);
    // setData(filteredArray);

    setTitle("");
    setSubtitle("");
    setPosition(null);
  };

  const handleEditCard = (id) => {
    // get card object
    const getCard = data.find((card) => card.id === id);
    // get position of the object in the array
    const position = data.findIndex((card) => card.id === id);
    setTitle(getCard.title);
    setSubtitle(getCard.subtitle);
    // set postion to state
    setPosition(position);
  };

  const handleSubmit = () => {
    // copy array
    const copiedArray = [...data];

    if (typeof position === "number") {
      // get Card Position in array to set title and subtitle
      copiedArray[position].title = title;
      copiedArray[position].subtitle = subtitle;
      // set array to updated array
      // setData(copiedArray);
      //clear input field
      setTitle("");
      setSubtitle("");
      setPosition(null);
    } else {
      // create new object
      const newCard = {
        id: uid(),
        title,
        subtitle,
      };
      // push new object to copied array
      copiedArray.push(newCard);

      // set data to new array
      // setData(copiedArray);

      // clear state
      setTitle("");
      setSubtitle("");
    }
  };

  return (
    <div className="App">
      <input
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        placeholder="subtitle"
        onChange={(e) => setSubtitle(e.target.value)}
        value={subtitle}
      />
      <button onClick={() => store.dispatch(deleteLastCard())}>
        {typeof position === "number" ? "Update Card" : "Create Card"}
      </button>

      <div style={{ display: "flex", gap: "20px", marginTop: "40px" }}>
        {data.map((card, idx) => {
          const { title, subtitle, id } = card;
          const checkIfItsOdd = idx % 2 === 0 ? true : false;
          return (
            <Card
              alt={checkIfItsOdd}
              title={title}
              subtitle={subtitle}
              onClickCard={() => handleEditCard(id)}
              onDelete={() => store.dispatch(deleteCard(id))}
              key={idx}
              id={id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
