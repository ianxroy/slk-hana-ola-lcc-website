
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { collection, addDoc, query, where, orderBy, limit, getDocs, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn, LogOut } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface TimeClockProps {
  userId: string;
}

interface TimeLog {
    id?: string;
    type: 'in' | 'out';
    timestamp: Timestamp;
}

export function TimeClock({ userId }: TimeClockProps) {
  const [lastLog, setLastLog] = useState<TimeLog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchLastLog = useCallback(async () => {
    setIsLoading(true);
    try {
      const logsCollection = collection(db, 'timeLogs');
      const q = query(
        logsCollection,
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(1)
      );
      const logSnapshot = await getDocs(q);
      if (!logSnapshot.empty) {
        const lastLogData = logSnapshot.docs[0].data() as TimeLog;
        setLastLog(lastLogData);
      } else {
        setLastLog(null);
      }
    } catch (error) {
      console.error("Error fetching last time log:", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not retrieve last time log.' });
    } finally {
      setIsLoading(false);
    }
  }, [userId, toast]);

  useEffect(() => {
    fetchLastLog();
  }, [fetchLastLog]);

  const handleTimeClock = async (type: 'in' | 'out') => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'timeLogs'), {
        userId: userId,
        type: type,
        timestamp: serverTimestamp(),
      });
      toast({ title: 'Success', description: `Successfully clocked ${type}.` });
      await fetchLastLog(); // Refresh state after new log
    } catch (error) {
      console.error("Error clocking time:", error);
      toast({ variant: 'destructive', title: 'Error', description: `Failed to clock ${type}.` });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const canClockIn = !lastLog || lastLog.type === 'out';
  const canClockOut = lastLog && lastLog.type === 'in';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Clock</CardTitle>
        <CardDescription>Log your work hours here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
            <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (
            <div className="space-y-4">
                <div className="flex justify-around gap-4">
                    <Button 
                        size="lg" 
                        className="w-full"
                        disabled={!canClockIn || isSubmitting}
                        onClick={() => handleTimeClock('in')}
                    >
                        {isSubmitting && !canClockOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
                        Time In
                    </Button>
                    <Button 
                        size="lg" 
                        variant="destructive"
                        className="w-full"
                        disabled={!canClockOut || isSubmitting}
                        onClick={() => handleTimeClock('out')}
                    >
                         {isSubmitting && canClockOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
                        Time Out
                    </Button>
                </div>
                <div>
                    {lastLog ? (
                        <p className="text-center text-muted-foreground">
                           Last activity: Clocked <span className="font-bold">{lastLog.type}</span> {formatDistanceToNow(lastLog.timestamp.toDate(), { addSuffix: true })}
                           <br/>
                           ({format(lastLog.timestamp.toDate(), "MMMM d, yyyy 'at' h:mm a")})
                        </p>
                    ) : (
                        <p className="text-center text-muted-foreground">No recent activity. Ready to clock in!</p>
                    )}
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
