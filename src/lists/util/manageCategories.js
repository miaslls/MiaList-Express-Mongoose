const categService = require('../../tags/tag.service');

const addListToCateg = async (category, list) => {
  const categToUpdate = await categService.findById(category);
  if (!categToUpdate) return res.status(404).send({ message: 'CATEGORY NOT FOUND' });

  if (!categToUpdate.lists.includes(list)) {
    categToUpdate.lists.push(list);
  }

  const categBody = { lists: categToUpdate.lists };
  await categService.update(category, categBody);
};

const removeListFromCateg = async (category, list) => {
  const categToUpdate = await categService.findById(category);
  if (!categToUpdate) return res.status(404).send({ message: 'CATEGORY NOT FOUND' });

  const categToUpdate_ListIds = [];

  categToUpdate.lists.forEach((list) => categToUpdate_ListIds.push(list.toString()));

  const removedListIndex = categToUpdate_ListIds.indexOf(list);
  categToUpdate_ListIds.splice(removedListIndex, 1);

  const categBody = { lists: categToUpdate_ListIds };
  await categService.update(category, categBody);
};

module.exports = { addListToCateg, removeListFromCateg };
