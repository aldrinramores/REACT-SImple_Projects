
import './App.css';
import Palindrome from './palindrome/Palindrome.jsx';
import Quote from './quote/Quote.jsx';
import Todo from './to-do/Todo.jsx';
import Calculator from './calculator/Calculator.jsx';
import Home from './home/Home.jsx';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/palindrome"  element={<Palindrome />} />
        <Route path="/quote"  element={<Quote />} />
        <Route path="/to-do"  element={<Todo />} />
        <Route path="/calculator"  element={<Calculator />} />
      </Routes>
    </div>
  );  
}

export default App;
