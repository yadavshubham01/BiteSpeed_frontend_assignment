import { useState, useEffect } from 'react';
import { BsArrowLeft } from "react-icons/bs";

const UpdateNode = ({ selectedNode, setNodeSelected, setNodes }: any) => {
  // State to hold the name of the node
  const [nodeName, setNodeName] = useState(selectedNode.data['label']);
  
  // Extract the id of the selected node
  let id = selectedNode.id;

  // Effect to update the nodeName when the selected node changes
  useEffect(() => {
    setNodeName(selectedNode.data['label']);
  }, [id]);

  // Effect to update the nodes list when nodeName or selectedNode changes
 useEffect(() => {
  const timeout = setTimeout(() => {
    setNodes((nds:any) =>
      nds.map((node:any) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: nodeName } }
          : node
      )
    );
  }, 300); // 300ms debounce

  return () => clearTimeout(timeout);
}, [nodeName]);

  // Function to handle the sidebar toggle
  const mainSidebar = () => {
    setNodeSelected(false); // Deselect the node
  };

  return (
    <>
      <div className="update">
        <div onClick={mainSidebar} className="back flex pointer items-center gap-2">
          <span className="material-symbols-outlined mr-2 cursor-pointer">
            <BsArrowLeft />
          </span>
          <h2 className="pl-10 m-0">Message</h2>
        </div>
      </div>
      <div className="w-full h-2"></div>
      <div className="update">
        <h3>Text:</h3>
        <textarea
          rows={4}
          cols={25}
          value={nodeName}
          onChange={(evt) => {
            setNodeName(evt.target.value); // Update the nodeName state when the textarea value changes
          }}
          className="mb-8 p-6 rounded text-lg"
        />
      </div>
      <div className="w-full h-2"></div>
    </>
  );
};

export default UpdateNode; // Export the UpdateNode component as the default export
