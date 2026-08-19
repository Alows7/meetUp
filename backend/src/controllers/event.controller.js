import prisma from "../config/prisma.js";

export async function getEvents(req, res) {
  try {
    const events = await prisma.event.findMany();
    if(!events) res.json({message : "No events found"});
    res.status(200).json({events})
  } catch (error) {
    res.status(500).json({message: "Internal server Error"});
    console.log("Error at getEvents controller ", error);
  }
}
export async function getEvent(req, res) {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: req.params.id
      }
    });
    if(!event) res.json({message : "No event found"});
    res.status(200).json({event})
  } catch (error) {
    res.status(500).json({message: "Internal server Error"});
    console.log("Error at getEvent controller ", error);
  }
}
export async function createEvent(req, res) {
  try {
    const {
      title, 
      description, 
      date, 
      duration,
      locationName, 
      organizerId,
      latitude, 
      longitude 
    } = req.body

    const event = await prisma.event.create({
      data: {
        title, 
        description, 
        date, 
        duration,
        locationName, 
        organizerId,
        latitude, 
        longitude 
      }
    });
    res.status(201).json({event})
  } catch (error) {
    res.status(500).json({message: "Internal server Error"});
    console.log("Error at createEvent controller ", error);
  }
}
export async function deleteEvent(req, res) {
  try {
    await prisma.event.delete({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({message : `Event deleted succefully`})
  } catch (error) {
    res.status(500).json({message: "Internal server Error"});
    console.log("Error at deleteEvent controller ", error);
  }
}

export async function updateEvent(req, res) {
  try {
    const {
        title, 
        description, 
        date, 
        duration,
        locationName, 
        organizerId,
        latitude, 
        longitude 
      } = req.body;
    const event = await prisma.event.update({
      where:{
        id: req.params.id
      },
      data: {
        title, 
        description, 
        date, 
        duration,
        locationName, 
        latitude, 
        longitude 
      }
    })
    res.status(200).json({message: "Event updated successfully"})
  } catch (error) {
    res.status(500).json({message: "Internal server Error"});
    console.log("Error at updateEvent controller ", error);
  }
}