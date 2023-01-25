import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../layout/Container";
import Loading from "../layout/Loading";
import Message from "../layout/Message";
import ProjectForm from "../project/ProjectForm";

import styles from "./Project.module.css";

const Project = () => {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }, [id]);

  const editPost = (project) => {
    if (project.budget < project.cost) {
      setMessage("Valor gasto não pode ser maior que o orçamento!");
      setType("error");
      return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Projeto atualizado com sucesso!");
        setType("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  };

  return (
    <>
      {project.name ? (
        <div className={styles.projectDetails}>
          <Container customClass="column">
            {message && <Message msg={message} type={type} />}
            <div className={styles.detailsContainer}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.projectInfo}>
                  <p>
                    <span>Categoria:</span> {project?.category?.name}
                  </p>
                  <p>
                    <span>Orçamento total:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.projectInfo}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Project;
