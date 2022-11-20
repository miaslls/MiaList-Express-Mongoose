import * as listService from '../../lists/list.service.js';

export const addEntryToList = async (list, entry) => {
  const listToUpdate = await listService.findById(list);
  if (!listToUpdate) return res.status(404).send({ message: 'CATEGORY NOT FOUND' });

  if (!listToUpdate.entries.includes(entry)) {
    listToUpdate.entries.push(entry);
  }

  const listBody = { entries: listToUpdate.entries };
  await listService.update(list, listBody);
};

export const removeEntryFromList = async (list, entry) => {
  const listToUpdate = await listService.findById(list);
  if (!listToUpdate) return res.status(404).send({ message: 'CATEGORY NOT FOUND' });

  const listToUpdate_EntryIds = [];

  listToUpdate.entries.forEach((entry) => listToUpdate_EntryIds.push(entry.toString()));

  const removedEntryIndex = listToUpdate_EntryIds.indexOf(entry);
  listToUpdate_EntryIds.splice(removedEntryIndex, 1);

  const listBody = { entries: listToUpdate_EntryIds };
  await listService.update(list, listBody);
};
