import { google } from 'googleapis';
import config from '../config/config.js';

const drive = google.drive({
  version: 'v3',
  auth: config.googleDrive.apiKey
});

export const uploadFileToDrive = async (fileStream, fileName, mimeType) => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: mimeType || 'application/octet-stream'
      },
      media: {
        mimeType: mimeType,
        body: fileStream
      }
    });
    return response.data;
  } catch (error) {
    console.error('Errore upload su Google Drive:', error);
    throw error;
  }
};

export const getFileFromDrive = async (fileId) => {
  try {
    const response = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType, webViewLink, webContentLink'
    });
    return response.data;
  } catch (error) {
    console.error('Errore recupero file da Drive:', error);
    throw error;
  }
};

export const shareFileOnDrive = async (fileId, emailList) => {
  try {
    for (const email of emailList) {
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'user',
          emailAddress: email
        }
      });
    }
    return true;
  } catch (error) {
    console.error('Errore condivisione file su Drive:', error);
    throw error;
  }
};
