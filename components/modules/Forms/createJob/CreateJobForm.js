import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "../input";
import ImageUpload from "../ImageUpload";
import ImageUpload2 from "../ImageUpload2";

const CreateJobSchema = Yup.object().shape({
  titre: Yup.string().trim().required("Veuillez choisir un titre"),
  description: Yup.string()
    .min(10, "Vous devez entrer 100 caractères minimum")
    .trim()
    .required("Veuillez écrire une description de votre metier"),
  prixTache: Yup.number()
    .positive()
    .integer()
    .min(1, "Un prix supérieur à 1")
    .required("Veuillez entrer un prix"),
  categorie: Yup.string().required("Veuillez choisir une categorie"),
  sousCategorie: Yup.string().required(
    "Veuillez choisir une sous catégorie pour votre annonce"
  ),
});

const CreateJobForm = ({
  initialValues = null,
  redirectPath = "",
  buttonText = "submit",
  onSubmit = () => null,
  categories,
  sousCategories,
}) => {
  const router = useRouter();
  // TEST
  // console.log(onSubmit);
  // console.log("Categories: ", categories);
  // console.log("Sous categories: ", sousCategories);

  const [disabled, setDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialValues?.image ?? "");

  const upload = async (image) => {
    if (!image) return;

    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Uploading...");
      const { data } = await axios.post("/api/upload-image", { image });
      setImageUrl(data?.url);
      toast.success("Successfully uploaded", { id: toastId });
    } catch (e) {
      toast.error("Unable to upload", { id: toastId });
      setImageUrl("");
    } finally {
      setDisabled(false);
    }
  };

  // cat et sou cat
  const formikRef = useRef();
  // Recuperer un champs du formulaire grâce à un useRef()
  console.log(formikRef.current?.values);

  const handleOnSubmit = async (values = null) => {
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Submitting...");
      // Submit data
      if (typeof onSubmit === "function") {
        await onSubmit({ ...values, image: imageUrl });
      }
      toast.success("Successfully submitted", { id: toastId });
      // Redirect user
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (e) {
      toast.error("Unable to submit", { id: toastId });
      setDisabled(false);
    }
  };

  const { image, ...initialFormValues } = initialValues ?? {
    image: "",
    titre: "",
    description: "",
    prixTache: 0,
    categorie: "",
    sousCategorie: "",
  };

  return (
    <>
      <div>
        <div className="">
          <div className="">
            <div className="overflow-hidden shadow sm:rounded-md p-6">
              <Formik
                initialValues={initialFormValues}
                validationSchema={CreateJobSchema}
                validateOnBlur={false}
                innerRef={formikRef}
                onSubmit={handleOnSubmit}
              >
                {({ isSubmitting, isValid }) => (
                  <div className="grid space-y-10">
                    <div className="">
                      <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1  sm:px-0">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Votre offre
                          </h3>
                          <p className="mt-1 text-sm text-gray-600"></p>
                        </div>
                        <Form className="space-y-8 mt-5 md:col-span-2 md:mt-0">
                          <div className="space-y-6">
                            <Input
                              name="titre"
                              type="text"
                              label="Titre de votre annonce"
                              placeholder="Menuisier - Toulon/Hyeres"
                              disabled={disabled}
                            />
                            <Input
                              name="description"
                              type="textarea"
                              label="Description de votre annonce"
                              placeholder="10 ans de metier en tant que .. Je suis un professionnel depuis ..."
                              disabled={disabled}
                              rows={5}
                            />
                            <Input
                              name="prixTache"
                              type="number"
                              min="0"
                              label="Prix (en EUR) par prestation"
                              placeholder="100"
                              disabled={disabled}
                            />
                          </div>
                        </Form>
                      </div>
                    </div>
                    <div className="">
                      <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1  sm:px-0">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Categorie de votre offre
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            La categorie représente le secteur est le domaine de
                            competence de votre annonce
                          </p>
                        </div>
                        <Form className="space-y-8 mt-5 md:col-span-2 md:mt-0">
                          <div className="grid grid-cols-2 gap-x-10 items-end">
                            <div className="form-control w-full max-w-xs">
                              <label className="label">
                                <span className="label-text">
                                  Celle-ci sera utile pour vous retrouver
                                </span>
                              </label>

                              <Field
                                className="select select-bordered"
                                name="categorie"
                                as="select"
                              >
                                <option value="0" className="text-xs">
                                  choisissez votre categorie
                                </option>
                                {categories.map((categorie) => {
                                  return (
                                    <>
                                      <option
                                        value={categorie.id}
                                        key={categorie.id}
                                      >
                                        {categorie.nom}
                                      </option>
                                    </>
                                  );
                                })}
                              </Field>
                            </div>

                            <div className="form-control w-full max-w-xs">
                              <label className="label">
                                <span className="label-text">
                                  Soyons plus précis
                                </span>
                              </label>

                              <Field
                                className="select select-bordered"
                                name="sousCategorie"
                                as="select"
                              >
                                <option value="" className="text-xs">
                                  choisissez une sous-categorie
                                </option>
                                {sousCategories.map((sousCategorie) => {
                                  return (
                                    <>
                                      {sousCategorie.categorieId ===
                                        formikRef.current?.values.categorie && (
                                        <option
                                          value={sousCategorie.id}
                                          key={sousCategorie.id}
                                        >
                                          {sousCategorie.nom}
                                        </option>
                                      )}
                                    </>
                                  );
                                })}
                              </Field>
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
                    <div className="">
                      <div className="mt-6 md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1  sm:px-0">
                          <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                              Votre image de marque
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                              Montrez-nous comment vous excellez dans votre
                              travail !
                            </p>
                          </div>
                        </div>
                        <Form className="space-y-8 mt-5 md:col-span-2 md:mt-0">
                          <div className="">
                            {/* <ImageUpload
                              initialImage={{
                                src: image,
                                alt: initialFormValues.title,
                              }}
                              onChangePicture={upload}
                            /> */}
                            <ImageUpload2 />
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="btn btn-success"
                              disabled={disabled || !isValid}
                            >
                              {isSubmitting ? "Submitting..." : buttonText}
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CreateJobForm.propTypes = {
  initialValues: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    prixTache: PropTypes.number,
    categorie: PropTypes.string,
    sousCategorie: PropTypes.string,
  }),
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default CreateJobForm;
