'use client'
import React from 'react';
import { ICar } from 'types/Car';
import CarCard from '@/front-ecom/views/cars/car.card';
import Button from '../button/Button';
import { useLocale } from '@/localization/useLocale';
import MoveTrigger from '../../animation/MoveTrigger';

interface CarsGridProps {
  cars: ICar[];
  className?: string;
  title?: string;
  description?: string;
}

export default function CarsGrid({ 
  cars,
  className,
  title = "Our Cars",
  description
}: CarsGridProps) {
  const locale = useLocale();

  return (
    <section className={`cars-grid section-margin ${className}`}>
      <div className="container">
        <div className="section-title mb-70">
          <MoveTrigger from={{ y: 0 }} to={{ y: -30 }} mobile={false}>
          {description && <p className="sub-heading mb-20 text-center">{description}</p>}
            <h2 className="title-section text-center">{title}</h2>
          </MoveTrigger>
        </div>

        <div className="cars-grid__container">
          {cars.map((car) => (
            <CarCard 
              key={car.id} 
              car={car}
              width="100%"
              style={{
                width: "100%",
              }}
            />
          ))}
        </div>

        <div className="cars-grid__button">
          <Button href={`/${locale}/cars`} className="mt-30" transitionPage={{title: "Our Cars"}}>
            All Inventory
          </Button>
        </div>
      </div>
    </section>
  );
} 