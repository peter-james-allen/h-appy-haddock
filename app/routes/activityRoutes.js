const express = require('express');
const activityModel = require('../models/activity');
const app = express();

app.get('/activities', async (request, response) => {
  const nibbles = await activityModel.find({ size: 'nibble' });
  const appetisers = await activityModel.find({ size: 'appetiser' });
  const mains = await activityModel.find({ size: 'main' });
  const desserts = await activityModel.find({ size: 'dessert' });
  const activities = {
    nibbles: nibbles,
    appetisers: appetisers,
    mains: mains,
    desserts: desserts,
  };

  try {
    response.send(activities);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/activities', async (request, response) => {
  const activities = await activityModel.find(request.body);
  try {
    response.send(activities);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.patch('/activities/:id', async (request, response) => {
  try {
    await activityModel.findByIdAndUpdate(request.params.id, request.body);
    await activityModel.save();
    response.send(activity);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete('/activities/:id', async (request, response) => {
  try {
    const activity = await activityModel.findByIdAndDelete(request.params.id);

    if (!activity) response.status(404).send('No item found');
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
