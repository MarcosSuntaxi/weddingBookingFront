"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import {
  createCateringService,
  createMusicService,
  createDecorationService,
  createPhotographyService,
  fetchCateringServices,
  fetchMusicServices,
  fetchDecorationServices,
  fetchPhotographyServices,
  updateCateringService,
  updateMusicService,
  updateDecorationService,
  updatePhotographyService,
  deleteCateringService,
  deleteMusicService,
  deleteDecorationService,
  deletePhotographyService,
} from "@/app/services/api"

interface Service {
  id: string
  name: string
  price: number
  category: "catering" | "music" | "decoration" | "photography"
}

export default function ServiceManagement() {
  const [services, setServices] = useState<{ [key: string]: Service[] }>({
    catering: [],
    music: [],
    decoration: [],
    photography: [],
  })
  const [newService, setNewService] = useState({ type: "", name: "", price: "" })
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    fetchAllServices()
  }, [])

  const fetchAllServices = async () => {
    try {
      const [catering, music, decoration, photography] = await Promise.all([
        fetchCateringServices(),
        fetchMusicServices(),
        fetchDecorationServices(),
        fetchPhotographyServices(),
      ])

      setServices({
        catering: catering.map((s: any) => ({ ...s, category: "catering", id: s.id_catering })),
        music: music.map((s: any) => ({ ...s, category: "music", id: s.id_music })),
        decoration: decoration.map((s: any) => ({ ...s, category: "decoration", id: s.id_decoration })),
        photography: photography.map((s: any) => ({ ...s, category: "photography", id: s.id_photography })),
      })
    } catch (error) {
      console.error("Error fetching services:", error)
    }
  }

  const handleCreateService = async () => {
    try {
      switch (newService.type) {
        case "catering":
          await createCateringService({ name: newService.name, price: Number(newService.price) })
          break
        case "music":
          await createMusicService({ name: newService.name, price: Number(newService.price) })
          break
        case "decoration":
          await createDecorationService({ name: newService.name, price: Number(newService.price) })
          break
        case "photography":
          await createPhotographyService({ name: newService.name, price: Number(newService.price) })
          break
      }

      await fetchAllServices()
      setNewService({ type: "", name: "", price: "" })
      setIsDialogOpen(false)
      toast({ title: "Éxito", description: "Servicio creado correctamente" })
    } catch (error) {
      console.error("Error creating service:", error)
    }
  }

  const handleUpdateService = async () => {
    if (!editingService) return

    try {
      switch (editingService.category) {
        case "catering":
          await updateCateringService(editingService.id, { name: editingService.name, price: editingService.price })
          break
        case "music":
          await updateMusicService(editingService.id, { name: editingService.name, price: editingService.price })
          break
        case "decoration":
          await updateDecorationService(editingService.id, { name: editingService.name, price: editingService.price })
          break
        case "photography":
          await updatePhotographyService(editingService.id, { name: editingService.name, price: editingService.price })
          break
      }

      await fetchAllServices()
      setEditingService(null)
      setIsEditDialogOpen(false)
      toast({ title: "Éxito", description: "Servicio actualizado correctamente" })
    } catch (error) {
      console.error("Error updating service:", error)
    }
  }

  const handleDeleteService = async (service: Service) => {
    try {
      switch (service.category) {
        case "catering":
          await deleteCateringService(service.id)
          break
        case "music":
          await deleteMusicService(service.id)
          break
        case "decoration":
          await deleteDecorationService(service.id)
          break
        case "photography":
          await deletePhotographyService(service.id)
          break
      }

      await fetchAllServices()
      toast({ title: "Éxito", description: "Servicio eliminado correctamente" })
    } catch (error) {
      console.error("Error deleting service:", error)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Servicios</h2>

      {/* Crear servicio */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Crear Servicio</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Servicio</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">

            {/* Selección de Categoría con colores diferenciados */}
            <Select
              value={newService.type}
              onValueChange={(value) => setNewService({ ...newService, type: value })}
            >
              <SelectTrigger className="bg-gray-100 text-gray-700 border-2 border-gray-300 hover:border-blue-500 focus:border-blue-500 rounded-md p-2">
                <SelectValue placeholder="Seleccionar Categoría" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-800 border border-gray-300 shadow-lg rounded-md">
                <SelectItem value="catering" className="hover:bg-blue-100 hover:text-blue-700 font-semibold">
                  🍽️ Catering
                </SelectItem>
                <SelectItem value="music" className="hover:bg-green-100 hover:text-green-700 font-semibold">
                  🎵 Música
                </SelectItem>
                <SelectItem value="decoration" className="hover:bg-yellow-100 hover:text-yellow-700 font-semibold">
                  🎨 Decoración
                </SelectItem>
                <SelectItem value="photography" className="hover:bg-purple-100 hover:text-purple-700 font-semibold">
                  📷 Fotografía
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Campos de Nombre y Precio */}
            <Input
              placeholder="Nombre del servicio"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              className="border-2 border-gray-300 focus:border-blue-500 rounded-md p-2"
            />
            <Input
              placeholder="Precio"
              type="number"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              className="border-2 border-gray-300 focus:border-blue-500 rounded-md p-2"
            />

            {/* Botón de Crear */}
            <Button
              onClick={handleCreateService}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md"
            >
              Crear
            </Button>

          </div>
        </DialogContent>
      </Dialog>


      {/* Editar servicio */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actualizar Servicio</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Nombre"
              value={editingService?.name || ""}
              onChange={(e) => setEditingService({ ...editingService!, name: e.target.value })}
            />
            <Input
              placeholder="Precio"
              type="number"
              value={editingService?.price || ""}
              onChange={(e) => setEditingService({ ...editingService!, price: Number(e.target.value) })}
            />
            <Button onClick={handleUpdateService}>Actualizar</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tabla de servicios */}
      {Object.entries(services).map(([category, serviceList]) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-bold mb-2 capitalize">{category}</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceList.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>${service.price}</TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => { setEditingService(service); setIsEditDialogOpen(true) }}>Actualizar</Button>
                    <Button variant="destructive" onClick={() => handleDeleteService(service)}>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  )
}
