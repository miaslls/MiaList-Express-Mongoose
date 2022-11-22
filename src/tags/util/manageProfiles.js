const profileService = require('../../profiles/profile.service');

const addTagToProfile = async (profile, tag) => {
  const profileToUpdate = await profileService.findById(profile);

  if (!profileToUpdate.tags.includes(tag)) {
    profileToUpdate.tags.push(tag);
  }

  const profileBody = { tags: profileToUpdate.tags };
  await profileService.update(profile, profileBody);
};

const removeTagFromProfile = async (profile, tag) => {
  const profileToUpdate = await profileService.findById(profile);

  const profileToUpdate_tagIds = [];
  profileToUpdate.tags.forEach((tag) => profileToUpdate_tagIds.push(tag.toString()));

  const removedTagIndex = profileToUpdate_tagIds.indexOf(tag);
  profileToUpdate_tagIds.splice(removedTagIndex, 1);

  const profileBody = { tags: profileToUpdate_tagIds };
  await profileService.update(profile, profileBody);
};

module.exports = { addTagToProfile, removeTagFromProfile };
