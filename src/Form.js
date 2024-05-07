// import React, { useState } from 'react';

// function Form() {
//   const [formData, setFormData] = useState({
//     name: '',
//     author: '',
//     date: '',
//     price: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch('http://localhost:7000/books', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formData)
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log('Book data inserted successfully:', data);
//       // Optionally, you can update the UI or show a success message here
//     })
//     .catch(error => {
//       console.error('There was a problem with the fetch operation:', error);
//       // Handle error
//     });
//   };

//   return (
//     <div>
//       <h1>Insert Book Data</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input type="text" name="name" value={formData.name} onChange={handleChange} />
//         </label>
//         <label>
//           Author:
//           <input type="text" name="author" value={formData.author} onChange={handleChange} />
//         </label>
//         <label>
//           Date:
//           <input type="Date" name="date" value={formData.date} onChange={handleChange} />
//         </label>
//         <label>
//           Price:
//           <input type="text" name="price" value={formData.price} onChange={handleChange} />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Form;


import React, { useState, useEffect } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    date: '',
    price: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {   
    e.preventDefault();
    fetch('http://localhost:7000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Book data inserted successfully:', data);
      // Optionally, you can update the UI or show a success message here
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      // Handle error
    });
  };

  const handleSearch = () => {
    fetch(`http://localhost:7000/books?search=${searchQuery}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSearchResults(data); // Update search results with fetched data
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error
      });
  };

  return (
    <div>
      <h1>Insert Book Data</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Author:
          <input type="text" name="author" value={formData.author} onChange={handleChange} />
        </label>
        <label>
          Date:
          <input type="Date" name="date" value={formData.date} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={formData.price} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      <div>
        <h2>Search Books</h2>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map(book => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.date}</td>
                <td>{book.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Form;





