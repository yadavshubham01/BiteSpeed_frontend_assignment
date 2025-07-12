import { Handle, Position } from "reactflow";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
// Define a functional component called AddNodeButton that takes a prop called `data`
const AddNode = ({ data } : any) => {
  return (
    <div
      // Style the main container div with a border and rounded corners
      style={{
        border: "1px solid black",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      }}
    >
      <div
        // Style the header part of the node with background color, rounded top corners, and padding
        style={{
          backgroundColor: "#b2f0e3",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          fontWeight: "bold",
          color: "black",
          paddingLeft: 15,
          paddingTop: 3,
          paddingBottom: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: 200,
        }}
      >
        <div
          // Style the container for the heading text and icon, aligning items to the center
          className="flex items-center gap-1"
        >
          <span
            // Style the icon with specific font size and padding
            className="material-symbols-outlined "
          >
            <MdOutlineMessage/>
          </span>
          {data.heading} {/* Display the heading text from the `data` prop */}
        </div>
        <div
          // Style the container for the WhatsApp icon with right padding
          style={{ paddingRight: 15 }}
        >
          <FaWhatsapp/>
        </div>
      </div>
      <div
        // Style the content part of the node with padding, rounded bottom corners, and white background
        style={{
          padding: 15,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          backgroundColor: "white",
        }}
      >
        <div
          // Style the label text with black color
          style={{
            color: "black",
          }}
        >
          {data.label} {/* Display the label text from the `data` prop */}
        </div>
      </div>
      {/* Add a handle for the source connection on the right side */}
      <Handle type="source" position={Position.Right} id="source" />
      {/* Add a handle for the target connection on the left side */}
      <Handle type="target" position={Position.Left} id="target" />
    </div>
  );
};

export default AddNode; // Export the AddNodeButton component as the default export
