const tagService = require('../../tags/tag.service');

const addListToTag = async (tag, list) => {
  const tagToUpdate = await tagService.findById(tag);

  if (!tagToUpdate.lists.includes(list)) {
    tagToUpdate.lists.push(list);
  }

  const tagBody = { lists: tagToUpdate.lists };
  await tagService.update(tag, tagBody);
};

const removeListFromTag = async (tag, list) => {
  const tagToUpdate = await tagService.findById(tag);

  const tagToUpdate_listIds = [];
  tagToUpdate.lists.forEach((list) => tagToUpdate_listIds.push(list.toString()));

  const removedListIndex = tagToUpdate_listIds.indexOf(list);
  tagToUpdate_listIds.splice(removedListIndex, 1);

  const tagBody = { lists: tagToUpdate_listIds };
  await tagService.update(tag, tagBody);
};

module.exports = { addListToTag, removeListFromTag };
