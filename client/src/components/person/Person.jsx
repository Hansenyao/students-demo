import { useEffect, useState } from "react";
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function Person() {
  const BASE_URL = import.meta.env.VITE_BASE_API_URL + "/students";

  //fake data
  // const [people, setPeople] = useState([
  //   {
  //     id: 1,
  //     name: "Sunny ",
  //     age: 30,
  //     gender: "M",
  //     enrolled_at: "2023-01-01",
  //   },
  //   { id: 2, name: "YouFang", age: 16, gender: "M", enrolled_at: "2022-05-15" },
  // ]);

  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    try {
      const loadPeople = async () => {
        var peopleData = (await axios.get(BASE_URL)).data;
        setPeople(peopleData);
      };
      loadPeople();
    } catch (error) {
      console.log(error);
      toast.error("Error has occured");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (editData) {
      methods.reset({
        ...editData,
        enrolled_at: editData.enrolled_at
          ? new Date(editData.enrolled_at)
          : null,
      });
    }
  }, [editData]);

  const defaultFormValues = {
    id: 0,
    name: "",
    age: null,
    gender: "",
    enrolled_at: null,
  };

  const methods = useForm({
    defaultValues: defaultFormValues,
  });

  const handlePersonEdit = (person) => {
    setEditData(person);
  };

  const handlePersonDelete = async (person) => {
    if (!confirm(`Are you sure to delete a person : ${person.name}`)) return;
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/${person.id}`);
      setPeople((previousPerson) =>
        previousPerson.filter((p) => p.id !== person.id)
      );
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Error on deleting");
    } finally {
      setLoading(false);
    }
  };

  const handleFormReset = () => {
    methods.reset(defaultFormValues);
  };

  const handleFormSubmit = async (person) => {
    setLoading(true);
    try {
      const dataToSend = {
        ...person,
        enrolled_at: person.enrolled_at
          ? new Date(person.enrolled_at).toISOString().split("T")[0]
          : null,
      };

      if (person.id <= 0) {
        console.log("add");
        const createdPerson = (await axios.post(BASE_URL, dataToSend)).data;
        setPeople((previousPerson) => [...previousPerson, createdPerson]);
      } else {
        console.log("edit");
        await axios.put(`${BASE_URL}/${person.id}`, dataToSend);
        setPeople((previousPeople) =>
          previousPeople.map((p) => (p.id === person.id ? person : p))
        );
      }
      methods.reset(defaultFormValues);
      toast.success("Saved successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error has occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Student Management
          </h1>
          {loading && <p>Loading...</p>}
        </div>

        {/* //Note: so Person is the parent component which is the smart component
        and PersonForm and PersonList and child component which is also a dumb
        component that only can execute but all the function and data are being
        pass from the parent component */}
        <PersonForm
          methods={methods}
          onFormReset={handleFormReset}
          onFormSubmit={handleFormSubmit}
        />
        <PersonList
          people={people}
          onPersonDelete={handlePersonDelete}
          onPersonEdit={handlePersonEdit}
        />
      </div>
    </div>
  );
}

export default Person;
