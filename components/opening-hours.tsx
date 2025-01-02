import { useState } from 'react'
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Switch } from "../components/ui/switch"
import { translations } from '../utils/translations'
import { useFormStore } from '../store/formStore'

type OpeningHoursProps = {
  openingHours: ReturnType<typeof useFormStore>['formData']['openingHours'];
  updateFields: (fields: Partial<ReturnType<typeof useFormStore>['formData']>) => void;
  t: typeof translations.en;
}

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as const;

export function OpeningHours({ openingHours, updateFields, t }: OpeningHoursProps) {
  const [localHours, setLocalHours] = useState(openingHours);

  const handleToggle = (day: string) => {
    setLocalHours(prev => {
      const newHours = { ...prev };
      newHours[day] = prev[day] ? null : { open: '09:00', close: '17:00' };
      updateFields({ openingHours: newHours });
      return newHours;
    });
  };

  const handleTimeChange = (day: string, type: 'open' | 'close', value: string) => {
    setLocalHours(prev => {
      const newHours = { ...prev };
      if (newHours[day]) {
        newHours[day] = { ...newHours[day], [type]: value } as { open: string; close: string };
      }
      updateFields({ openingHours: newHours });
      return newHours;
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t.openingHours}</h2>
      {daysOfWeek.map((day) => (
        <div key={day} className="flex items-center space-x-4">
          <Switch
            id={`${day}-toggle`}
            checked={!!localHours[day]}
            onCheckedChange={() => handleToggle(day)}
          />
          <Label htmlFor={`${day}-toggle`} className="w-24 capitalize">
            {t[day]}
          </Label>
          {localHours[day] && (
            <>
              <Input
                type="time"
                value={localHours[day]?.open}
                onChange={(e) => handleTimeChange(day, 'open', e.target.value)}
                className="w-24"
              />
              <span>{t.to}</span>
              <Input
                type="time"
                value={localHours[day]?.close}
                onChange={(e) => handleTimeChange(day, 'close', e.target.value)}
                className="w-24"
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

