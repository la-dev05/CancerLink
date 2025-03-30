import React from 'react';
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Clock, MapPin, CheckCircle2 } from "lucide-react";

const Community = () => {
  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Community Discussions</h1>
          <p className="text-muted-foreground">
            Engage with fellow patients, survivors, and caregivers. Share your experiences, ask questions, and find support.
          </p>
        </div>
      </section>

      <section className="py-4 md:py-6">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="recent" className="w-full">
            <TabsList>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="my-posts">My Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="recent">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <CardTitle className="text-sm font-bold">shadcn</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">
                          2 hours ago
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Just finished my first chemo session. Feeling a bit overwhelmed but trying to stay positive!
                    </p>
                    <div className="mt-4 flex items-center space-x-2">
                      <Badge variant="secondary">Chemotherapy</Badge>
                      <Badge variant="secondary">Support</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <span>12</span>
                      <Button variant="ghost" size="icon">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <span>4</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/sadmann7.png" alt="@sadmann7" />
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <CardTitle className="text-sm font-bold">sadmann7</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">
                          1 day ago
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Looking for advice on managing fatigue during radiation therapy. Any tips?
                    </p>
                    <div className="mt-4 flex items-center space-x-2">
                      <Badge variant="secondary">Radiation Therapy</Badge>
                      <Badge variant="secondary">Fatigue</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <span>8</span>
                      <Button variant="ghost" size="icon">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <span>2</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="popular">
              <div>
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <CardTitle className="text-sm font-bold">shadcn</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">
                          3 days ago
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Sharing my story of overcoming stage 3 breast cancer. It's been a tough journey, but I'm grateful for the support I've received.
                    </p>
                    <div className="mt-4 flex items-center space-x-2">
                      <Badge variant="secondary">Breast Cancer</Badge>
                      <Badge variant="secondary">Survivor</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <span>25</span>
                      <Button variant="ghost" size="icon">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <span>10</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="my-posts">
              <div>
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <CardTitle className="text-sm font-bold">shadcn</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">
                          1 week ago
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Started a new clinical trial for lung cancer. Fingers crossed for positive results!
                    </p>
                    <div className="mt-4 flex items-center space-x-2">
                      <Badge variant="secondary">Lung Cancer</Badge>
                      <Badge variant="secondary">Clinical Trial</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <span>15</span>
                      <Button variant="ghost" size="icon">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <span>5</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-4 md:py-6">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Start a New Discussion</h2>
          <Input type="text" placeholder="Enter your post title" className="mb-2" />
          <Input type="text" placeholder="Write your post here..." className="mb-2" />
          <Button>Post</Button>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
