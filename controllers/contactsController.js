import { mockData } from "../models/mockData";

const getAllContacts = (req, res) => {
  res.json(mockData);
};

export { getAllContacts };
