import React, { useState } from "react";
import "./styles.css"; // We'll create this CSS file next

const QuantityModal = ({ initialQuantity, onSave, onClose, isLoading }) => {
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  const handleSave = () => {
    onSave(quantity);
    // onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Update Quantity</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <input
            type="number"
            defaultValue={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ width: "100%", height: 45, padding: 10 }}
          />
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="save-button" onClick={handleSave}>
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantityModal;
