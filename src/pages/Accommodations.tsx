import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Search, 
  BedDouble, 
  Star, 
  Mail,
  Phone,
  Calendar,
  DollarSign,
  UtensilsCrossed,
  Clock,
  Filter,
  BadgeCheck,
  ArrowRight
} from "lucide-react";

// Mock data
const accommodations = [
  {
    id: 1,
    name: "Healthcare Hospitality House",
    type: "Non-profit Housing",
    address: "123 Care Street, New York, NY 10065",
    distanceToHospital: "0.3 miles",
    walkTime: "6 mins",
    price: "Free - $30/night",
    amenities: ["Kitchen", "Laundry", "WiFi", "Shared Bathroom"],
    rating: 4.7,
    reviews: 156,
    verifiedPartner: true,
    availableFrom: "Immediately",
    foodOptions: [
      {
        name: "Home Kitchen Network",
        type: "Home-cooked Meals",
        cuisines: ["Indian", "American", "Vegetarian"],
        pricePerMeal: "$12-15",
        deliveryTime: "30-45 mins",
        specialDiets: ["Neutropenic", "Soft Diet", "Low-Sodium"]
      }
    ]
  },
  // ...Add more mock data...
];

const AccommodationCard = ({ accommodation }: { accommodation: typeof accommodations[0] }) => (
  <Card className="h-full">
    <CardHeader>
      <div className="flex justify-between">
        <div>
          <CardTitle>{accommodation.name}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {accommodation.distanceToHospital} ({accommodation.walkTime} walk)
          </CardDescription>
        </div>
        {accommodation.verifiedPartner && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <BadgeCheck className="h-4 w-4" />
            Verified
          </Badge>
        )}
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          <span className="font-medium">{accommodation.price}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{accommodation.rating}</span>
          <span className="text-muted-foreground">({accommodation.reviews})</span>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Available Meal Services</h4>
        {accommodation.foodOptions.map((food, idx) => (
          <div key={idx} className="bg-muted p-3 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h5 className="font-medium">{food.name}</h5>
                <p className="text-sm text-muted-foreground">{food.type}</p>
              </div>
              <Badge variant="outline">{food.pricePerMeal}</Badge>
            </div>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-1">
                <UtensilsCrossed className="h-3 w-3" />
                <span>{food.cuisines.join(", ")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{food.deliveryTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter className="flex gap-2">
      <Button variant="outline" className="flex-1">
        <Phone className="h-4 w-4 mr-2" />
        Contact
      </Button>
      <Button className="flex-1">
        Book Now
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </CardFooter>
  </Card>
);

const Accommodations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">
            Find Comfortable Stays Near Treatment Centers
          </h1>
          <p className="text-muted-foreground">
            Discover affordable accommodations with convenient access to home-cooked meals, 
            specially prepared for cancer patients and their families.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[300px,1fr]">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Filter Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="low">Under $50/night</SelectItem>
                    <SelectItem value="mid">$50-100/night</SelectItem>
                    <SelectItem value="high">$100+/night</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Add more filters as needed */}
            </CardContent>
          </Card>

          <div className="space-y-6">
            {accommodations.map((accommodation) => (
              <AccommodationCard 
                key={accommodation.id} 
                accommodation={accommodation} 
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Accommodations;
