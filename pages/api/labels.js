import fsPromises from 'fs/promises';
import path from 'path';

const newLabelsFilePath = path.join(process.cwd(), 'newLabels.json');

export default async function handler(req, res) {

  if (req.method === 'GET') {
    const jsonData = await fsPromises.readFile(newLabelsFilePath);
    const objectData = JSON.parse(jsonData);

    res.status(200).json(objectData);
  } else if (req.method === 'POST') {
    
    try {
        // Read the existing data from the JSON file
        const jsonData = await fsPromises.readFile(newLabelsFilePath);
        const objectData = JSON.parse(jsonData);
  
        // Get the data from the request body
        const { ID, newLabel, index } = req.body;
  
        // Add the new data to the object
        const newData = {
          ID,
          newLabel,
          index
        };
        objectData.push(newData);
  
        // Convert the object back to a JSON string
        const updatedData = JSON.stringify(objectData);
  
        // Write the updated data to the JSON file
        await fsPromises.writeFile(newLabelsFilePath, updatedData);
  
        // Send a success response
        res.status(200).json({ message: 'Data stored successfully' });
      } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ message: 'Error storing data' });
      }
    }
}