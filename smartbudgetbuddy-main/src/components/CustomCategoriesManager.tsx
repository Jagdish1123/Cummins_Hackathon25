
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { DialogTitle, DialogDescription, DialogContent, DialogHeader, Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check, Edit, Trash2, Plus, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

interface CustomCategoriesManagerProps {
  defaultCategories?: Category[];
  onCategoriesChange?: (categories: Category[]) => void;
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: "1", name: "Food", color: "#FF6B6B" },
  { id: "2", name: "Transport", color: "#4ECDC4" },
  { id: "3", name: "Shopping", color: "#FFD166" },
  { id: "4", name: "Entertainment", color: "#6A0572" },
  { id: "5", name: "Bills", color: "#1A535C" },
  { id: "6", name: "Health", color: "#F25F5C" },
  { id: "7", name: "Education", color: "#247BA0" }
];

export function CustomCategoriesManager({ 
  defaultCategories = DEFAULT_CATEGORIES,
  onCategoriesChange
}: CustomCategoriesManagerProps) {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#6E56CF");
  const [error, setError] = useState("");

  const handleAddCategory = () => {
    setIsDialogOpen(true);
    setEditingCategory(null);
    setNewCategoryName("");
    setNewCategoryColor("#6E56CF");
    setError("");
  };

  const handleEditCategory = (category: Category) => {
    setIsDialogOpen(true);
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryColor(category.color);
    setError("");
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter(cat => cat.id !== categoryId);
    setCategories(updatedCategories);
    
    if (onCategoriesChange) {
      onCategoriesChange(updatedCategories);
    }
    
    toast.success("Category deleted successfully");
  };

  const handleSaveCategory = () => {
    if (!newCategoryName.trim()) {
      setError("Category name cannot be empty");
      return;
    }
    
    // Check for duplicate category name
    const isDuplicate = categories.some(
      cat => cat.name.toLowerCase() === newCategoryName.toLowerCase() && 
             (!editingCategory || cat.id !== editingCategory.id)
    );
    
    if (isDuplicate) {
      setError("A category with this name already exists");
      return;
    }
    
    let updatedCategories: Category[];
    
    if (editingCategory) {
      // Update existing category
      updatedCategories = categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: newCategoryName, color: newCategoryColor } 
          : cat
      );
      toast.success("Category updated successfully");
    } else {
      // Add new category
      const newCategory: Category = {
        id: uuidv4(),
        name: newCategoryName,
        color: newCategoryColor,
      };
      
      updatedCategories = [...categories, newCategory];
      toast.success("Category added successfully");
    }
    
    setCategories(updatedCategories);
    
    if (onCategoriesChange) {
      onCategoriesChange(updatedCategories);
    }
    
    setIsDialogOpen(false);
  };

  const PREDEFINED_COLORS = [
    "#FF6B6B", "#4ECDC4", "#FFD166", "#6A0572", "#1A535C", 
    "#F25F5C", "#247BA0", "#70C1B3", "#FFE066", "#50514F",
    "#F07818", "#EBB3A9", "#6E56CF", "#3EB489", "#FF4365"
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Expense Categories</CardTitle>
              <CardDescription>Customize your expense categories</CardDescription>
            </div>
            <Button onClick={handleAddCategory} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-72 pr-4">
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.name}</span>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
            <DialogDescription>
              {editingCategory
                ? "Update your expense category details"
                : "Create a custom category for your expenses"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            {error && (
              <div className="flex items-center space-x-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g., Travel, Gifts, Pet Care"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Category Color</Label>
              <div className="grid grid-cols-5 gap-2">
                {PREDEFINED_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all"
                    style={{
                      backgroundColor: color,
                      borderColor: newCategoryColor === color ? "white" : color,
                    }}
                    onClick={() => setNewCategoryColor(color)}
                  >
                    {newCategoryColor === color && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="pt-4 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveCategory}>
                {editingCategory ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
