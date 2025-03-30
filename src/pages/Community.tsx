
import Layout from "@/components/layout/Layout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MessageSquare, 
  Heart, 
  Reply, 
  Share, 
  Calendar, 
  Users 
} from "lucide-react";

// Mock data for discussion threads
const discussionThreads = [
  {
    id: 1,
    title: "Coping with chemo side effects - what worked for you?",
    author: {
      name: "Sarah J.",
      image: "/placeholder.svg",
      initials: "SJ",
      role: "Breast Cancer Survivor"
    },
    category: "Treatment",
    replies: 24,
    views: 156,
    createdAt: "2 days ago",
    excerpt: "I'm starting my third round of chemo next week and the side effects have been challenging. Would love to hear what's worked for others in managing nausea, fatigue, and brain fog..."
  },
  {
    id: 2,
    title: "Resources for families supporting cancer patients",
    author: {
      name: "Michael C.",
      image: "/placeholder.svg",
      initials: "MC",
      role: "Caregiver"
    },
    category: "Support",
    replies: 18,
    views: 97,
    createdAt: "1 day ago",
    excerpt: "My wife was recently diagnosed, and our whole family is adjusting to the new reality. Are there any good resources or support groups for children and spouses of cancer patients?"
  },
  {
    id: 3,
    title: "Clinical trial experiences - MD Anderson Phase 2 Study",
    author: {
      name: "Robert G.",
      image: "/placeholder.svg",
      initials: "RG",
      role: "Lymphoma Survivor"
    },
    category: "Clinical Trials",
    replies: 12,
    views: 88,
    createdAt: "3 days ago",
    excerpt: "I've been invited to participate in a Phase 2 clinical trial at MD Anderson for a new immunotherapy approach. Has anyone participated in this specific trial or similar ones? I'd appreciate hearing about your experiences."
  },
  {
    id: 4,
    title: "Post-treatment anxiety and how to manage it",
    author: {
      name: "Elena R.",
      image: "/placeholder.svg",
      initials: "ER",
      role: "Colon Cancer Survivor"
    },
    category: "Survivorship",
    replies: 31,
    views: 205,
    createdAt: "5 days ago",
    excerpt: "I finished my last treatment three months ago and got the all-clear, but I'm finding myself constantly anxious about recurrence. Every little pain makes me panic. How do others cope with this post-treatment anxiety?"
  },
  {
    id: 5,
    title: "Insurance denied my treatment - next steps?",
    author: {
      name: "David W.",
      image: "/placeholder.svg",
      initials: "DW",
      role: "Lung Cancer Patient"
    },
    category: "Financial",
    replies: 27,
    views: 178,
    createdAt: "4 days ago",
    excerpt: "My insurance just denied coverage for a treatment my oncologist recommended. I'm feeling lost and don't know what to do next. Has anyone successfully appealed a denial or found alternative funding?"
  }
];

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Virtual Support Group: Newly Diagnosed",
    date: "June 15, 2023",
    time: "7:00 PM - 8:30 PM EST",
    format: "Online",
    participants: 18
  },
  {
    id: 2,
    title: "Nutrition Workshop for Cancer Patients",
    date: "June 18, 2023",
    time: "2:00 PM - 4:00 PM EST",
    format: "Online",
    participants: 45
  },
  {
    id: 3,
    title: "Cancer Survivors Day Celebration",
    date: "June 20, 2023",
    time: "11:00 AM - 3:00 PM EST",
    format: "In-person",
    location: "Central Park, Boston",
    participants: 124
  }
];

const Community = () => {
  return (
    <Layout>
      <div className="py-12 md:py-16 container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter mb-4">Cancer Support Community</h1>
          <p className="text-muted-foreground text-lg">
            Connect with others, share experiences, and find support throughout your cancer care journey.
          </p>
        </div>
        
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="discussions">
                <TabsList className="mb-6 w-full grid grid-cols-3">
                  <TabsTrigger value="discussions">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Discussions
                  </TabsTrigger>
                  <TabsTrigger value="events">
                    <Calendar className="h-4 w-4 mr-2" />
                    Events
                  </TabsTrigger>
                  <TabsTrigger value="groups">
                    <Users className="h-4 w-4 mr-2" />
                    Support Groups
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="discussions" className="mt-0">
                  <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
                    <div className="relative flex-grow max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search discussions..." className="pl-9" />
                    </div>
                    <Button>Start New Discussion</Button>
                  </div>
                  
                  <div className="space-y-6">
                    {discussionThreads.map((thread) => (
                      <div key={thread.id} className="border rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="bg-muted/30 p-4 flex flex-row md:flex-col items-center md:items-start gap-4 md:min-w-[160px] md:border-r">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={thread.author.image} alt={thread.author.name} />
                              <AvatarFallback className="bg-cancer-purple text-white">
                                {thread.author.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{thread.author.name}</div>
                              <div className="text-xs text-muted-foreground">{thread.author.role}</div>
                            </div>
                          </div>
                          
                          <div className="flex-1 p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-medium text-lg">{thread.title}</h3>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                  <Badge variant="outline" className="text-xs py-0 font-normal">
                                    {thread.category}
                                  </Badge>
                                  <span>{thread.createdAt}</span>
                                  <span>{thread.views} views</span>
                                  <span>{thread.replies} replies</span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {thread.excerpt}
                            </p>
                            
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Heart className="h-4 w-4 mr-1" />
                                Like
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Reply className="h-4 w-4 mr-1" />
                                Reply
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share className="h-4 w-4 mr-1" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="events" className="mt-0">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Upcoming Community Events</h2>
                    <Button variant="outline">View Calendar</Button>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id} className="h-full flex flex-col">
                        <CardHeader>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription>
                            <Badge variant="outline" className="font-normal">
                              {event.format}
                            </Badge>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-2 text-sm">
                          <div className="flex gap-2 items-center">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{event.time}</span>
                          </div>
                          {event.location && (
                            <div className="flex gap-2 items-center">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          <div className="flex gap-2 items-center">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{event.participants} participants</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Register</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-muted-foreground mb-2">
                      Have an event to share with the community?
                    </p>
                    <Button variant="outline">Submit an Event</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="groups" className="mt-0">
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold mb-4">Find Your Support Group</h2>
                    <p className="text-muted-foreground mb-6">
                      Connect with others who understand what you're going through in a safe, supportive environment.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label htmlFor="cancer-type" className="text-sm font-medium block mb-2">
                            Cancer Type
                          </label>
                          <select 
                            id="cancer-type" 
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                          >
                            <option value="">All Cancer Types</option>
                            <option value="breast">Breast Cancer</option>
                            <option value="lung">Lung Cancer</option>
                            <option value="prostate">Prostate Cancer</option>
                            <option value="colorectal">Colorectal Cancer</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="group-type" className="text-sm font-medium block mb-2">
                            Group Type
                          </label>
                          <select 
                            id="group-type" 
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                          >
                            <option value="">All Group Types</option>
                            <option value="patient">Patients</option>
                            <option value="survivor">Survivors</option>
                            <option value="caregiver">Caregivers</option>
                            <option value="family">Family Members</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label htmlFor="meeting-format" className="text-sm font-medium block mb-2">
                            Meeting Format
                          </label>
                          <select 
                            id="meeting-format" 
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                          >
                            <option value="">Any Format</option>
                            <option value="virtual">Virtual</option>
                            <option value="in-person">In-Person</option>
                            <option value="hybrid">Hybrid</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="location" className="text-sm font-medium block mb-2">
                            Location
                          </label>
                          <Input id="location" placeholder="City, State, or Zip" />
                        </div>
                      </div>
                      <Button className="w-full mt-4">Find Support Groups</Button>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-6 text-center">
                      <h3 className="text-lg font-medium mb-2">Start Your Own Group</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Can't find a group that fits your needs? We can help you start a new support group within our community.
                      </p>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Connect with Survivors</CardTitle>
              <CardDescription>
                Talk directly with those who have been through similar experiences
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                Our survivor network includes people who have experienced various types of cancer and treatments. Find someone who understands what you're going through and can offer practical advice.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Find Survivors</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Ask a Question</CardTitle>
              <CardDescription>
                Get guidance from our community of patients, survivors, and healthcare professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Question Title
                    </label>
                    <Input id="title" placeholder="e.g., Advice on managing treatment side effects" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="details" className="text-sm font-medium">
                      Details
                    </label>
                    <Textarea
                      id="details"
                      placeholder="Share more details about your question..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Post Question</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Community Guidelines</CardTitle>
              <CardDescription>
                Our values for creating a supportive and respectful environment
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <div>
                <h4 className="font-medium">Respect & Empathy</h4>
                <p className="text-muted-foreground">
                  Treat all community members with kindness and understanding. Everyone's journey is unique.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Privacy</h4>
                <p className="text-muted-foreground">
                  Respect the privacy of others. Don't share personal information without permission.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Medical Advice</h4>
                <p className="text-muted-foreground">
                  Community advice is not a substitute for professional medical guidance. Always consult healthcare providers.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Read Full Guidelines</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
