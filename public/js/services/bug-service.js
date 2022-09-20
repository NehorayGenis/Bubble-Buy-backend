export const bugService = {
  query,
  getById,
  getEmptyBug,
  save,
  remove,
  getBugsData,
}
const API = 'api/bug/'
function query(filterBy) {
  return axios.get(API, { params: filterBy }).then((res) => res.data)
}

function getById(bugId) {
  return axios.get(API + bugId).then((res) => res.data)
}

function remove(bugId) {
  return axios.delete(API + bugId)
}

function save(bug) {
  if (bug._id) {
    return axios.put(API + bug._id, bug).then((res) => res.data)
  } else {
    return axios.post(API, bug).then((res) => res.data)
  }
}

function getBugsData() {
  return axios.get(API + 'data').then((res) => res.data)
}

function getEmptyBug() {
  return {
    title: '',
    severity: '',
    description: '',
  }
}
