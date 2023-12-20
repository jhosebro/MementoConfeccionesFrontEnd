import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";


const Colegios = () => {
  const [colegios, setColegios] = useState([]);
  const [nuevoColegio, setNuevoColegio] = useState({
    Nombre: "",
    Dirección: "",
    Teléfono: "",
  });

  const [selectedColegio, setSelectedColegio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchColegios();
  }, []);

  const fetchColegios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/colegios");
      setColegios(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de colegios:", error);
    }
  };

  const handleInputChange = (e) => {
    setNuevoColegio({
      ...nuevoColegio,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenModal = (colegio) => {
    setSelectedColegio(colegio);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedColegio(null);
    setIsModalOpen(false);
  };

  const handleUpdateColegio = async () => {
    try {
      await axios.put(
        `http://localhost:3000/colegios/?Id=${selectedColegio.Id}`,
        selectedColegio
      );
      await fetchColegios();
      handleCloseModal();
    } catch (error) {
      console.error("Error al actualizar el colegio:", error);
    }
  };

  const handleCrearColegio = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/colegios/get-next-id"
      );
      const nuevoId = response.data.nextId;

      const createResponse = await axios.post(
        "http://localhost:3000/colegios",
        {
          ...nuevoColegio,
          Id: nuevoId,
        }
      );

      setColegios((prevColegios) => [...prevColegios, createResponse.data]);

      setNuevoColegio({
        Nombre: "",
        Dirección: "",
        Teléfono: "",
      });
      await fetchColegios()
    } catch (error) {
      console.error("Error al crear el colegio:", error);
    }
  };

  const handleBorrarColegio = async (colegioId) => {
    try {
      await axios.delete(`http://localhost:3000/colegios/?Id=${colegioId}`);
      const updatedColegios = colegios.filter(
        (colegio) => colegio.Id !== colegioId
      );
      setColegios(updatedColegios);
    } catch (error) {
      console.error("Error al borrar el colegio:", error);
    }
  };

  const renderColegioRows = () => {
    return colegios.map((colegio, index) => (
      <tr key={index}>
        <td>{colegio.Id}</td>
        <td>{colegio.Nombre}</td>
        <td>{colegio.Dirección}</td>
        <td>{colegio.Teléfono}</td>
        <td>
          <button
            className="btn btn-warning mr-2"
            onClick={() => handleOpenModal(colegio)}
          >
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleBorrarColegio(colegio.Id)}
          >
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      
      <div className="container mt-5">
        <h2>Colegios</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{renderColegioRows()}</tbody>
        </table>
        <div>
          <h3>Agregar nuevo colegio</h3>
          <label>
            Nombre:
            <input
              type="text"
              name="Nombre"
              value={nuevoColegio.Nombre}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Dirección:
            <input
              type="text"
              name="Dirección"
              value={nuevoColegio.Dirección}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Teléfono:
            <input
              type="text"
              name="Teléfono"
              value={nuevoColegio.Teléfono}
              onChange={handleInputChange}
            />
          </label>
          <button className="btn btn-primary" onClick={handleCrearColegio}>
            Crear Colegio
          </button>
        </div>
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
          <h2>Actualizar Colegio</h2>
          {selectedColegio && (
            <div>
              <label>
                Nombre:
                <input
                  type="text"
                  name="Nombre"
                  value={selectedColegio.Nombre}
                  onChange={(e) =>
                    setSelectedColegio({
                      ...selectedColegio,
                      Nombre: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Dirección:
                <input
                  type="text"
                  name="Dirección"
                  value={selectedColegio.Dirección}
                  onChange={(e) =>
                    setSelectedColegio({
                      ...selectedColegio,
                      Dirección: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Teléfono:
                <input
                  type="text"
                  name="Teléfono"
                  value={selectedColegio.Teléfono}
                  onChange={(e) =>
                    setSelectedColegio({
                      ...selectedColegio,
                      Teléfono: e.target.value,
                    })
                  }
                />
              </label>
              <button
                className="btn btn-success mr-2"
                onClick={handleUpdateColegio}
              >
                Actualizar Colegio
              </button>
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Cancelar
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Colegios;
