
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { ColorPicker } from "@/components/ColorPicker";
import { Trash2, Plus, Edit, Circle } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

export interface Category {
  id: string;
  name: string;
  color: string;
  isDefault?: boolean;
}

interface CategoryManagerProps {
  initialCategories?: Category[];
  onCategoriesChange?: (categories: Category[]) => void;
}

export const CategoryManager = ({
  initialCategories = [],
  onCategoriesChange
}: CategoryManagerProps) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories.length ? initialCategories : [
    { id: '1', name: 'Food & Restaurant', color: '#FF6B6B', isDefault: true },
    { id: '2', name: 'Transport', color: '#4ECDC4', isDefault: true },
    { id: '3', name: 'Entertainment', color: '#FFD166', isDefault: true },
    { id: '4', name: 'Rent', color: '#6A0572', isDefault: true },
    { id: '5', name: 'Utilities', color: '#1A535C', isDefault: true },
    { id: '6', name: 'Health', color: '#F25F5C', isDefault: true },
    { id: '7', name: 'Financial Tools', color: '#247BA0', isDefault: true },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#FF5722');
  
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Expense Categories",
      description: "Manage your expense categories",
      addCategory: "Add Category",
      editCategory: "Edit Category",
      categoryName: "Category Name",
      categoryColor: "Category Color",
      cancel: "Cancel",
      save: "Save",
      defaultBadge: "Default",
      customBadge: "Custom"
    },
    mr: {
      title: "खर्च श्रेणी",
      description: "आपल्या खर्च श्रेणी व्यवस्थापित करा",
      addCategory: "श्रेणी जोडा",
      editCategory: "श्रेणी संपादित करा",
      categoryName: "श्रेणीचे नाव",
      categoryColor: "श्रेणीचा रंग",
      cancel: "रद्द करा",
      save: "जतन करा",
      defaultBadge: "डीफॉल्ट",
      customBadge: "कस्टम"
    }
  };

  const t = translations[language];

  const handleAddCategory = () => {
    setEditingCategory(null);
    setNewCategoryName('');
    setNewCategoryColor('#FF5722');
    setIsDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryColor(category.color);
    setIsDialogOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter(c => c.id !== categoryId);
    setCategories(updatedCategories);
    onCategoriesChange?.(updatedCategories);
    toast.success(language === 'en' ? "Category deleted successfully" : "श्रेणी यशस्वीरित्या हटवली");
  };

  const handleSaveCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error(language === 'en' ? "Category name cannot be empty" : "श्रेणीचे नाव रिक्त असू शकत नाही");
      return;
    }

    let updatedCategories: Category[];

    if (editingCategory) {
      // Edit existing category
      updatedCategories = categories.map(c => 
        c.id === editingCategory.id 
          ? { ...c, name: newCategoryName, color: newCategoryColor }
          : c
      );
      toast.success(language === 'en' ? "Category updated successfully" : "श्रेणी यशस्वीरित्या अद्यतनित केली");
    } else {
      // Add new category
      const newCategory: Category = {
        id: Date.now().toString(),
        name: newCategoryName,
        color: newCategoryColor
      };
      updatedCategories = [...categories, newCategory];
      toast.success(language === 'en' ? "Category added successfully" : "श्रेणी यशस्वीरित्या जोडली");
    }

    setCategories(updatedCategories);
    onCategoriesChange?.(updatedCategories);
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </div>
        <Button size="sm" onClick={handleAddCategory}>
          <Plus className="h-4 w-4 mr-1" />
          {t.addCategory}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map(category => (
            <div 
              key={category.id} 
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center">
                <div className="mr-3 flex-shrink-0">
                  <Circle style={{ fill: category.color, color: category.color }} className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">{category.name}</p>
                  <div className="mt-1">
                    {category.isDefault ? (
                      <Badge variant="outline" className="text-xs">
                        {t.defaultBadge}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-primary/10 text-xs">
                        {t.customBadge}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleEditCategory(category)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                {!category.isDefault && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:text-destructive/80"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? t.editCategory : t.addCategory}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="category-name" className="text-sm font-medium">
                {t.categoryName}
              </label>
              <Input
                id="category-name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder={language === 'en' ? "Enter category name" : "श्रेणीचे नाव प्रविष्ट करा"}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t.categoryColor}
              </label>
              <div className="grid grid-cols-7 gap-2">
                {['#FF6B6B', '#4ECDC4', '#FFD166', '#6A0572', '#1A535C', '#F25F5C', '#247BA0'].map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`h-8 w-8 rounded-full border-2 transition-all ${
                      newCategoryColor === color ? 'border-primary scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setNewCategoryColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleSaveCategory}>
              {t.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CategoryManager;
