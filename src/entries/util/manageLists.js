const listService = require('../../lists/list.service');

const addEntryToList = async (list, entry) => {
  const listToUpdate = await listService.findById(list);

  if (!listToUpdate.entries.includes(entry)) {
    listToUpdate.entries.push(entry);
  }

  const listBody = { entries: listToUpdate.entries };
  await listService.update(list, listBody);
};

const removeEntryFromList = async (list, entry) => {
  const listToUpdate = await listService.findById(list);

  const listToUpdate_EntryIds = [];
  listToUpdate.entries.forEach((entry) => listToUpdate_EntryIds.push(entry.toString()));

  const removedEntryIndex = listToUpdate_EntryIds.indexOf(entry);
  listToUpdate_EntryIds.splice(removedEntryIndex, 1);

  const listBody = { entries: listToUpdate_EntryIds };
  await listService.update(list, listBody);
};

module.exports = { addEntryToList, removeEntryFromList };
