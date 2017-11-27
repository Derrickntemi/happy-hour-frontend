export function findVenueById(id, venues){
  return venues.filter(venue => {
    return (venue.id == id)
  })[0]
}
