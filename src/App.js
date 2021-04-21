import React from 'react';
import './App.css'
import testData  from './mockdata/sample.json';

const {useState, useCallback} = React;

const Application = () => {
  let [searchTerm, setSearchTerm] = React.useState("");
  let [form, setForm] = React.useState([]);
  let [data, setData] = React.useState([]);
  let list = testData;

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const removeItem = (e) => {
    list.splice(list.indexOf(), e.target.dataset.id)
    document.querySelector("span[data-id='"+e.target.dataset.id+"']").parentElement.remove();
  }

  const editItem = (e) => {
    console.log(e.target.parentElement.parentElement);
  }

  const addItem = (e) => {
    const image = document.getElementById('image').files[0];
    const productName = document.getElementById('product-name').value;
    const price = document.getElementById('price').value;
    const divElement = document.querySelector('.column').parentElement;
    const keyId = document.querySelectorAll('.column').length;
    const divChild = document.createElement('div');
    const span = document.createElement('span');
    divChild.setAttribute("class","column");
    span.setAttribute("data-di", keyId);
    divElement.append(divChild);
    const divLastElement = document.querySelector('.column:last-child');
    divLastElement.append(span);
    const divChildElement = document.createElement('div');
    divChildElement.setAttribute("class", "card");
    divLastElement.append(divChildElement);
    const imageElement = document.createElement('img');
    const spanElement = document.querySelector('span');
    imageElement.setAttribute('src', image);
    imageElement.setAttribute('width','100px');
    imageElement.setAttribute('height', '100px');
    const h3Element = document.createElement('h3');

    divChildElement.append(imageElement);
    divChildElement.append(h3Element);
    list.push({id: keyId, image: 'asdasd.jpg', name: productName, price: price})
    document.getElementById('product-name').value=''; 
    document.getElementById('price').value='';
    console.log(testData)
  }

  const uploadedFile = (e) => {

  }

  React.useEffect(() => {
    const results = list.filter(list =>
      list.name.toString().toLocaleLowerCase().includes(searchTerm)
    );
    setData(results);
  },[searchTerm])

  return (
    <div className="App">
      <div className="input-text">
      <input type="text" autoFocus value={searchTerm.toLowerCase()} onChange={handleChange} placeholder="Search" />
      <div className="formInput">
        <input type="file" name="image" id="image" onChange={uploadedFile} /><br />
        <label>Product Name</label>
        <input type="text" name="product-name" id="product-name"/>
        <label>Price</label>
        <input type="text" name="price" id="price"/>
        <button onClick={addItem}>Add Item</button>
      </div>
      </div>
      <div className="row">
      { data.map((item, i) => 
          <div key={i} className="column"><span onClick={removeItem} data-id={i} >X</span>
            <div className="card">
            <img width="100px" height="100px" src={item.image} alt={item.name}/>
            <h3>{item.name}</h3>
              <p>{item.price}</p>
              <div className="btn" onClick={editItem}>edit</div>
            </div>

          </div>
      )}
      </div>
    </div>
  );
}




function App() {
  return (
    <Application />
  )
}

export default App;
