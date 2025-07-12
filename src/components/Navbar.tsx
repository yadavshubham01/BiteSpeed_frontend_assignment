const Navbar = ({ saveFlow } : any) => {
  return (
    // Container div with classes for styling and centering content
    <div className="savingChange mt-4 flex justify-center items-center bg-white border-b border-gray-200 py-4 shadow-sm">
      {/* Button that triggers the saveFlow function when clicked */}
      <button onClick={saveFlow} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1">
        Save Flow
      </button>
    </div>
  );
}

export default Navbar; // Export the TopNav component as the default export
